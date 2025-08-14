import { lazy } from 'react';
import { Users, List } from 'lucide-react'; // ← iconos como componentes
import type { ModuleConfig } from '@/core/module.types';

const ContactList = lazy(() => import('../pages/ContactList'));
const ContactList1 = lazy(() => import('../pages/ContactList1'));

const config: ModuleConfig = {
  name: 'Contactos',
  routeBase: '/contactos',
  icon: Users, // ← antes: 'pi pi-users'
  menu: [
    { path: '/contactos', label: 'Lista de contactos', element: <ContactList />, icon: List },
    { path: '/contactos1', label: 'Lista de contactos1', element: <ContactList1 /> },
    { path: '/contactos2', label: 'Lista de contactos2', element: <ContactList /> },
  ],
  depends: [],
};

export default config;
