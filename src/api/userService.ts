// src/api/userService.ts
// @ts-nocheck
import http from './http';

/**
 * Obtiene las compañías del usuario.
 * Ajusta la ruta si tu backend usa otra (por ejemplo: /api/user/companies?id=123)
 */
export const getUserCompanies = async (userId) => {
  const { data } = await http.get(`/api/users/${userId}/companies`);
  return data; // ← CRUDO
};

/**
 * Setea la compañía activa del usuario.
 * Ajusta la ruta según tu backend (POST/PUT y path).
 * Ejemplos comunes:
 *  - POST /api/users/:userId/company   { companyId }
 *  - PUT  /api/users/company           { userId, companyId }
 */
export const setCompanyUser = async ({ userId, companyId }) => {
  const { data } = await http.post(`/api/users/${userId}/company`, { companyId });
  return data; // ← CRUDO
};

/**
 * (Opcional) Perfil del usuario actual logueado
 * GET /api/users/me
 */
export const getMe = async () => {
  const { data } = await http.get('/api/users/me');
  return data; // ← CRUDO
};

/**
 * (Opcional) Actualiza preferencias del usuario
 * PUT /api/users/:userId/preferences
 */
export const updateUserPreferences = async (userId, prefs) => {
  const { data } = await http.put(`/api/users/${userId}/preferences`, prefs);
  return data; // ← CRUDO
};

const userService = {
  getUserCompanies,
  setCompanyUser,
  getMe,
  updateUserPreferences,
};

export default userService;
