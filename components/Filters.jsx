"use client";
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, applyFilters, resetFilters } from '../store/rosterSlice';

export default function Filters(){
  const dispatch = useDispatch();
  const { all, filters } = useSelector(s => s.roster);

  const providerTypes = useMemo(()=> ['All', ...Array.from(new Set(all.map(p=>p.provider_usertype).filter(Boolean)))], [all]);
  const centers = useMemo(()=> ['All', ...Array.from(new Set(all.map(p=>p.clinic_details?.name).filter(Boolean)))], [all]);

  return (
    <div className="flex gap-3 flex-wrap items-center">
      <select
        value={filters.provider_usertype}
        onChange={e=>dispatch(setFilter({key:'provider_usertype', value:e.target.value}))}
        className="px-3 py-2 border border-gray-200 rounded-md bg-white shadow-sm text-sm"
      >
        {providerTypes.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select
        value={filters.inhouse}
        onChange={e=>dispatch(setFilter({key:'inhouse', value:e.target.value}))}
        className="px-3 py-2 border border-gray-200 rounded-md bg-white shadow-sm text-sm"
      >
        <option value="All">All</option>
        <option value="true">In-house</option>
        <option value="false">External</option>
      </select>

      <select
        value={filters.center}
        onChange={e=>dispatch(setFilter({key:'center', value:e.target.value}))}
        className="px-3 py-2 border border-gray-200 rounded-md bg-white shadow-sm text-sm"
      >
        {centers.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <div className="ml-auto flex gap-2">
        <button
          onClick={()=>{ dispatch(applyFilters()); }}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-md shadow hover:opacity-95 text-sm"
        >Apply</button>
        <button
          onClick={()=>{ dispatch(resetFilters()); }}
          className="px-4 py-2 border border-gray-200 rounded-md bg-white text-sm"
        >Reset</button>
      </div>
    </div>
  );
}
