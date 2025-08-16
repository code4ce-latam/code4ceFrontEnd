// src/api/authService.ts
// @ts-nocheck
import http from './http';

const authService = {
  // Devuelve la respuesta CRUDA del backend (sin normalizar)
  login: async ({ email, password }) => {
    const { data } = await http.post('/api/auth/login', { email, password });
    return data;
  },

  // Opcionales, por si los tienes en el backend
  me: async () => {
    const { data } = await http.get('/api/auth/me');
    return data;
  },

  refresh: async () => {
    const { data } = await http.post('/api/auth/refresh');
    return data;
  },

  logout: async () => {
    // Si tu backend invalida sesión en servidor
    try {
      await http.post('/api/auth/logout');
    } catch {}
  },
};

export default authService;
