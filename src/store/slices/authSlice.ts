// src/store/slices/authSlice.ts
// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '@/api/authService';
import { getUserCompanies, setCompanyUser } from '@/api/userService';

const USER_KEY = 'auth_payload'; // guardamos TODO el payload
const TOKEN_KEY = 'token_guess'; // opcional (si quieres guardar algo tipo token)

// Helpers opcionales para persistir (sin normalizar)
function saveSession(payload) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(payload));
  sessionStorage.setItem(TOKEN_KEY, payload?.jwt);
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const initialState = {
  user: null,
  userCompanies: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  message: '',
  lastLoginAt: null, // para depuración/expiraciones, etc.
};

// Rehidrata estado inicial desde sessionStorage
const persisted = loadSession();
if (persisted) {
  initialState.user = persisted;
  initialState.isAuthenticated = true;
}

// ==== Thunks sin tipos ni normalización ====

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    // Lo que sea que devuelva el backend, lo guardamos
    const response = await authService.login(userData);
    return response;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'Error en la autenticación. Verifica tus credenciales.';
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchUserCompanies = createAsyncThunk('auth/fetchUserCompanies', async (idUser, thunkAPI) => {
  try {
    const response = await getUserCompanies(idUser);
    return response; // tal cual
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.response?.data || error?.message || 'Error al listar Compañías';
    return thunkAPI.rejectWithValue(message);
  }
});

export const setCompany = createAsyncThunk('auth/setCompany', async (data, thunkAPI) => {
  try {
    const response = await setCompanyUser(data);
    return response; // tal cual
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.response?.data || error?.message || 'Error configurar compañía';
    return thunkAPI.rejectWithValue(message);
  }
});

// ==== Slice práctico ====

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Guarda cualquier objeto como "usuario/payload" crudo
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isError = false;
      state.message = '';
      state.lastLoginAt = Date.now();
      saveSession(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.userCompanies = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = false;
      state.message = '';
      state.lastLoginAt = null;
      try {
        sessionStorage.removeItem(USER_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
      } catch {}
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payload = action.payload; // CRUDO
        state.isAuthenticated = true;
        state.isError = false;
        state.message = '';
        state.lastLoginAt = Date.now();
        saveSession(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Error al iniciar sesión.';
      })

      // COMPAÑÍAS
      .addCase(fetchUserCompanies.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
        state.userCompanies = null;
      })
      .addCase(fetchUserCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCompanies = action.payload; // CRUDO (array/obj como venga)
      })
      .addCase(fetchUserCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Error al listar Compañías';
        state.userCompanies = null;
      })

      // SET COMPANY
      .addCase(setCompany.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(setCompany.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(setCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Error configurar compañía';
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

// Selectores “prácticos”
export const selectAuth = (s) => s.auth;
export const selectIsAuthenticated = (s) => s.auth.isAuthenticated;
export const selectIsLoading = (s) => s.auth.isLoading;
export const selectIsError = (s) => s.auth.isError;
export const selectMessage = (s) => s.auth.message;
export const selectPayload = (s) => s.auth.user;
export const selectUserCompanies = (s) => s.auth.userCompanies;
