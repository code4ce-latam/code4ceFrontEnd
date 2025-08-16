// src/api/http.ts
// @ts-nocheck
import axios from 'axios';

export const TOKEN_KEY = 'token_guess'; // mismo key que usas en el slice
const API_BASE_URL = import.meta.env.VITE_API_URL || '/';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  // withCredentials: true, // ← descomenta si usas cookies HttpOnly
});

// Adjunta token (si existe) en cada request
http.interceptors.request.use((config) => {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

// Manejo genérico de errores (opcional)
http.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default http;
