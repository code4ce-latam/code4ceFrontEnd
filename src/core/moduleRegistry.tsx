import { Suspense } from 'react';
import type { ModuleConfig } from './module.types';

/** Descubre automáticamente todos los configs de módulos */
const discovered = import.meta.glob<true, string, { default: ModuleConfig }>(
  '../modules/**/config/module.config.{ts,tsx,js,jsx}',
  { eager: true }
);

export const modules: ModuleConfig[] = Object.values(discovered)
  .map((m) => m.default)
  .filter(Boolean);

/** Normaliza path: quita "/" inicial para usar en rutas anidadas bajo /dashboard */
const toRelative = (p: string) => p.replace(/^\/+/, '');

/** Construye rutas para React Router DENTRO de /dashboard/* (rutas relativas) */
export function getRoutesRelative() {
  return modules.flatMap((mod) =>
    (mod.menu || []).map((item) => ({
      path: toRelative(item.path),
      // soporte a componentes lazy con Suspense si los usas
      element: <Suspense fallback={null}>{item.element}</Suspense>,
    }))
  );
}

/** Construye items ABSOLUTOS para links en Sidebar/Header (con prefijo /dashboard) */
export function getSidebarItemsAbsolute(base = '/dashboard') {
  return modules
    .filter((m) => !m.hidden)
    .map((mod) => ({
      label: mod.name,
      icon: mod.icon,
      items: (mod.menu || []).map((item) => ({
        label: item.label,
        to: item.path.startsWith('/') ? `${base}${item.path}` : `${base}/${item.path}`,
        icon: item.icon,
      })),
    }));
}
