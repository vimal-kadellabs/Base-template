/**
 * Sticky Icon Menu
 * Compact icon-only menu with tooltips
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, filterNavigationByRole } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

export function StickyIconMenu({ 
  className = '',
  selectedItem,
  onItemSelect 
}) {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();
  
  const menuItems = filterNavigationByRole(
    NAVIGATION_ITEMS, 
    currentUser?.role, 
    isAdmin
  );

  const isActive = (item) => {
    if (selectedItem?.id === item.id) return true;
    return location.pathname === item.path;
  };

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          'flex h-screen w-[70px] flex-col border-r border-sidebar-border bg-sidebar',
          className
        )}
        data-testid="sticky-icon-menu"
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to={ROUTES.DASHBOARD}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform hover:scale-105"
                data-testid="sticky-menu-logo"
              >
                <LayoutGrid className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              Dashboard
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Menu Items */}
        <ScrollArea className="flex-1">
          <nav className="flex flex-col items-center gap-2 p-2" data-testid="sticky-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onItemSelect?.(item)}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg transition-all',
                        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                        active 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' 
                          : 'text-sidebar-foreground'
                      )}
                      data-testid={`sticky-nav-item-${item.id}`}
                      aria-label={item.name}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  );
}

export default StickyIconMenu;
