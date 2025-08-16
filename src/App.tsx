import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/core/MainLayout';
import AppRouter from '@/core/AppRouter';
import LoginPage from './modules/auth/LoginPage';

import RequireAuth from '@/core/RequireAuth';
import PublicOnly from '@/core/PublicOnly';

export default function App() {
  return (
    <Routes>
      {/* pública: solo si NO estás logueado */}
      <Route
        path="/login"
        element={
          <PublicOnly>
            <LoginPage />
          </PublicOnly>
        }
      />

      {/* privada: todo tu sistema vive bajo /dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <RequireAuth>
            <MainLayout>
              <></>
            </MainLayout>
          </RequireAuth>
        }
      />

      {/* redirecciones útiles */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
