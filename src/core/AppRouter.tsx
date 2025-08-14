import { Routes, Route, Navigate } from 'react-router-dom';
import { getRoutesRelative } from './moduleRegistry';

export default function AppRouter() {
  const routes = getRoutesRelative();

  return (
    <Routes>
      {/* Índice del dashboard (home) */}
      <Route index element={<div className="p-4">Dashboard</div>} />

      {/* Rutas generadas desde los módulos */}
      {routes.map((r, i) => (
        <Route key={i} path={r.path} element={r.element} />
      ))}

      {/* Catch-all dentro de /dashboard */}
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
}
