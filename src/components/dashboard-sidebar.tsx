import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/components/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Home, ChevronDown, ChevronRight } from 'lucide-react';
import { getSidebarItemsAbsolute } from '@/core/moduleRegistry';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  isMobile: boolean;
}

export function DashboardSidebar({ isCollapsed, isMobile }: DashboardSidebarProps) {
  const { pathname } = useLocation();

  // secciones desde los módulos
  const sections = useMemo(() => getSidebarItemsAbsolute('/dashboard'), []);

  // abre todas las secciones por defecto (ajusta si prefieres cerradas)
  const [openSections, setOpenSections] = useState<string[]>(() => sections.map((s) => s.label));

  const toggleSection = (label: string) => {
    setOpenSections((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  // activo exacto (para /dashboard home)
  const isExactActive = (to: string) => pathname === to;
  // activo para items (exacto o subruta)
  const isActive = (to?: string) => !!to && (pathname === to || pathname.startsWith(to + '/'));

  const renderDashboardHome = () => {
    const active = isExactActive('/dashboard');
    return (
      <Button
        key="__dashboard"
        variant={active ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start gap-3 h-10',
          isCollapsed ? 'px-2' : 'px-3',
          active && 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary'
        )}
        title={isCollapsed ? 'Dashboard' : undefined}
        asChild
      >
        <Link to="/dashboard">
          <Home className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
      </Button>
    );
  };

  const renderSection = (section: (typeof sections)[number]) => {
    const isOpen = openSections.includes(section.label);

    return (
      <Collapsible key={section.label} open={isOpen && !isCollapsed} onOpenChange={() => toggleSection(section.label)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost" // ← nunca se marca el encabezado
            className={cn('w-full justify-start gap-3 h-10', isCollapsed ? 'px-2' : 'px-3')}
            title={isCollapsed ? section.label : undefined}
          >
            {section.icon ? <section.icon className="h-4 w-4 flex-shrink-0" /> : <span className="h-4 w-4" />}
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{section.label}</span>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </>
            )}
          </Button>
        </CollapsibleTrigger>

        {!isCollapsed && (
          <CollapsibleContent className="space-y-1">
            {section.items.map((item) => {
              const active = isActive(item.to);
              return (
                <Button
                  key={item.to}
                  variant={active ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-10 pl-8',
                    active && 'bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary'
                  )}
                  title={isCollapsed ? item.label : undefined}
                  asChild
                >
                  <Link to={item.to}>
                    {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </CollapsibleContent>
        )}
      </Collapsible>
    );
  };

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r bg-background transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        isMobile && 'absolute inset-y-0 left-0 z-50 shadow-lg'
      )}
    >
      <div className="flex-1 overflow-auto py-4">
        <nav className={cn('space-y-1', isCollapsed ? 'px-2' : 'px-3')}>
          {renderDashboardHome()}
          {sections.map((sec) => renderSection(sec))}
        </nav>
      </div>
    </div>
  );
}
