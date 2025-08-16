// src/components/layout/DashboardLayout.tsx
// @ts-nocheck
import React, { useEffect } from 'react';

import { DashboardHeader } from '@/components/dashboard-header'; // ajusta ruta si tu export es distinto
import { DashboardSidebar } from '@/components/dashboard-sidebar'; // ajusta ruta si tu export es distinto

import { useIsMobile } from '@/components/hooks/use-mobile';
import { LayoutProvider, useLayout } from '@/components/lib/layout-context';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </LayoutProvider>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { menuType, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useLayout();

  // Ajuste de sidebar según viewport
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(false);
      setSidebarOpen(false);
    }
  }, [isMobile, setSidebarCollapsed, setSidebarOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onToggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} isMobile={isMobile} />

      {menuType === 'sidebar' ? (
        <div className="flex h-[calc(100vh-4rem)] relative">
          {isMobile && sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
          )}

          {(!isMobile || sidebarOpen) && <DashboardSidebar isCollapsed={sidebarCollapsed} isMobile={isMobile} />}

          <main
            className={`flex-1 overflow-auto transition-all duration-300 ${
              isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-16' : 'ml-64'
            }`}
          >
            {children}
          </main>
        </div>
      ) : (
        <main className="h-[calc(100vh-4rem)] overflow-auto">{children}</main>
      )}
    </div>
  );
}
