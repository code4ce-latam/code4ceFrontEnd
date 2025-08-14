import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/core/MainLayout'; // tu layout principal
import AppRouter from '@/core/AppRouter'; // router de módulos
import LoginPage from './modules/auth/LoginPage'; // tu login (el que pegaste)

export default function App() {
  return (
    <Routes>
      {/* pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* privada: todo tu sistema vive bajo /dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <MainLayout>
            <>{null}</>
          </MainLayout>
        }
      />

      {/* redirecciones útiles */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
