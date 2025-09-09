import axios from 'axios';

const API_BASE = '/mock'; // served from public/mock

export const fetchRoster = async () => {
  const res = await axios.get('/mock/roster.json');
  return res.data;
};
