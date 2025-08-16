// src/components/layout/DashboardHeader.tsx
// @ts-nocheck
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, Settings, Building2, Menu, X, LayoutDashboard, Navigation } from 'lucide-react';

// 👉 Redux
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, selectPayload } from '@/store/slices/authSlice';

// Layout context (se mantiene igual)
import { useLayout } from '@/components/lib/layout-context';
import { DashboardHeaderMenu } from '@/components/dashboard-header-menu';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export function DashboardHeader({ onToggleSidebar, isSidebarOpen, isMobile }: DashboardHeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { menuType, setMenuType } = useLayout();

  // ⬇️ Leemos TODO lo que devolvió el backend (payload crudo)
  const payload = useAppSelector(selectPayload);

  // Pequeños helpers para mostrar nombre/email sin normalizar:
  const displayName =
    payload?.user?.name ?? payload?.name ?? payload?.usuario?.nombre ?? payload?.fullName ?? 'Usuario';

  const displayEmail = payload?.user?.email ?? payload?.email ?? payload?.correo ?? payload?.user_email ?? '';

  const getInitials = (name: string) =>
    (name || 'U')
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {menuType === 'sidebar' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="h-9 w-9 p-0"
              aria-label="toggle sidebar"
            >
              {isMobile && isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          )}

          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-primary hidden sm:block">Plataforma Profesional</h1>
          </div>

          {menuType === 'header' && (
            <div className="ml-8">
              <DashboardHeaderMenu />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Switch tipo de menú */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 px-3">
                {menuType === 'sidebar' ? <LayoutDashboard className="h-4 w-4" /> : <Navigation className="h-4 w-4" />}
                <span className="ml-2 hidden sm:inline">{menuType === 'sidebar' ? 'Sidebar' : 'Header'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-[100]">
              <DropdownMenuItem onClick={() => setMenuType('sidebar')}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Menú Lateral
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setMenuType('header')}>
                <Navigation className="mr-2 h-4 w-4" />
                Menú Superior
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-sm text-muted-foreground hidden sm:block">Bienvenido, {displayName}</span>

          {/* Usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="user menu">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{displayEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
