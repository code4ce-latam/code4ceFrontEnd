// src/modules/clientes/config/module.config.tsx
import { lazy } from 'react';
import type { ModuleConfig } from '@/core/module.types';
import { Users, Package, IdCard } from 'lucide-react'; // ← iconos como componentes
const ClienteList = lazy(() => import('../pages/ClienteList'));

const config: ModuleConfig = {
  name: 'Clientes',
  routeBase: '/clientes',
  icon: IdCard, // ← componente (no string)
  menu: [
    { path: '/clientes', label: 'Lista de clientes', element: <ClienteList />, icon: Users },
    { path: '/clientes2', label: 'Lista de clientes2', element: <ClienteList />, icon: Package },
    { path: '/clientes3', label: 'Lista de clientes3', element: <ClienteList />, icon: Package },
  ],
  depends: [],
};

export default config;
