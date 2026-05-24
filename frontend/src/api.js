import axios from 'axios';
import { MOCK_SKILLS, MOCK_RESULTS } from './mockData';

const USE_MOCK = false;

// Hardcode the ngrok URL directly — no fallback to localhost
const BASE_URL = process.env.REACT_APP_API_URL || 'https://campuslens-backend-ywk7.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'  // ← this bypasses ngrok's warning page
  }
});

export async function getSkills() {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_SKILLS;
  }
  const res = await api.get('/skills');
  return res.data;
}

export async function getMatches(profile) {
  if (USE_MOCK) {
    await new Promise(r => setTimeout(r, 1200));
    return { ...MOCK_RESULTS, user_name: profile.name };
  }
  const res = await api.post('/match', profile);
  return res.data;
}

export async function checkHealth() {
  if (USE_MOCK) return { status: 'ok' };
  const res = await api.get('/health');
  return res.data;
}