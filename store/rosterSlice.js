import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRoster } from '../services/api';

export const loadRoster = createAsyncThunk('roster/load', async () => {
  const data = await fetchRoster();
  return data;
});

const rosterSlice = createSlice({
  name: 'roster',
  initialState: {
    all: [],
    filtered: [],
    loading: false,
    error: null,
    // Filters aligned to API: provider_usertype, is_inhouse (inhouse), clinic centre name, and search by provider name
    filters: {
      provider_usertype: 'All',
      inhouse: 'All', // 'All' | true | false (UI may pass booleans or strings)
      center: 'All',
      search: ''
    }
  },
  reducers: {
    setFilter(state, action){
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    applyFilters(state){
      const { provider_usertype, inhouse, center, search } = state.filters;
      state.filtered = state.all.filter(p => {
        // provider type (e.g., 'therapist', 'psychiatrist')
        if (provider_usertype !== 'All' && p.provider_usertype !== provider_usertype) return false;

        // inhouse filter: could be boolean or string 'true'/'false'
        if (inhouse !== 'All') {
          const inhouseBool = (inhouse === true || inhouse === 'true');
          if (Boolean(p.is_inhouse) !== Boolean(inhouseBool)) return false;
        }

        // center compares clinic_details.name if present
        if (center !== 'All') {
          const clinicName = p.clinic_details?.name || '';
          if (clinicName !== center) return false;
        }

        // search by provider name
        if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
    },
    resetFilters(state){
      state.filters = { provider_usertype: 'All', inhouse: 'All', center: 'All', search: '' };
      state.filtered = state.all;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadRoster.pending, (state)=>{ state.loading=true; })
      .addCase(loadRoster.fulfilled, (state, action) => {
        state.loading=false;
        state.all = action.payload;
        state.filtered = action.payload;
      })
      .addCase(loadRoster.rejected, (state, action) => {
        state.loading=false;
        state.error = action.error.message;
      });
  }
});

export const { setFilter, applyFilters, resetFilters } = rosterSlice.actions;
export default rosterSlice.reducer;
