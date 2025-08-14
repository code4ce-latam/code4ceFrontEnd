// src/core/module.types.ts
import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

export type ModuleMenuItem = {
  path: string;
  label: string;
  element: ReactNode;
  icon?: LucideIcon; // ← componente
};

export type ModuleConfig = {
  name: string;
  routeBase?: string;
  icon?: LucideIcon; // ← componente
  menu: ModuleMenuItem[];
  depends?: string[];
  hidden?: boolean;
};
