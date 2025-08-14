import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/components/lib/utils';
import { getSidebarItemsAbsolute } from '@/core/moduleRegistry';

export function DashboardHeaderMenu() {
  const { pathname } = useLocation();
  const sections = getSidebarItemsAbsolute('/dashboard');

  const isActive = (to: string) => pathname === to || pathname.startsWith(to + '/');

  if (!sections.length) return null;

  return (
    <nav className="flex items-center space-x-1">
      {sections.map((section) => (
        <DropdownMenu key={section.label}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 px-3 text-sm font-medium">
              {section.icon ? <section.icon className="mr-2 h-4 w-4" /> : null}
              <span>{section.label}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-56 z-[70]">
            {section.items.map((item) => (
              <DropdownMenuItem
                key={item.to}
                asChild
                className={cn(
                  'px-2 py-2 text-sm', // estilos del item (no del Link)
                  isActive(item.to)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                <Link to={item.to} className="flex items-center gap-2">
                  {item.icon ? <item.icon className="h-4 w-4" /> : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </nav>
  );
}
