// src/components/layout/DashboardLayout.tsx
import React, { useEffect } from 'react';
// Usa SIEMPRE el mismo contexto que envuelve tu app en main.tsx:
import { useAuth } from '@/components/lib/auth-context'; // <- ajusta si aún lo tienes en components/lib
import { useNavigate } from 'react-router-dom';

import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
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
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { menuType, sidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useLayout();

  // Redirige a /login si no hay sesión (equivalente al push('/') de Next)
  useEffect(() => {
    if (!isLoading && !user) navigate('/login', { replace: true });
  }, [user, isLoading, navigate]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null; // en cuanto el effect corre, navega a /login

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
