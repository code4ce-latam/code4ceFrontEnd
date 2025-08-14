'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type MenuType = 'sidebar' | 'header';
type ViewType = 'table' | 'cards';

interface LayoutContextType {
  menuType: MenuType;
  setMenuType: (type: MenuType) => void;
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [menuType, setMenuType] = useState<MenuType>('sidebar');
  const [viewType, setViewType] = useState<ViewType>('table');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        menuType,
        setMenuType,
        viewType,
        setViewType,
        sidebarOpen,
        setSidebarOpen,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
