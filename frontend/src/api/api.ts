// src/api.ts
import axios from 'axios';

// ✅ Uses .env for production, fallback to localhost for local dev
const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Automatically attach Bearer token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ✅ Optional: Basic error logging
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API error:', err?.response?.data || err.message);
    return Promise.reject(err);
  }
);

console.log('🌐 Using API base:', `${API_URL}/api`);
