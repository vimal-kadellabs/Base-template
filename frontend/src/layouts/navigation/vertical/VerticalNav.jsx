/**
 * Vertical Navigation
 * Base vertical sidebar navigation component
 */

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, filterNavigationByRole } from '@/constants/navigation';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VerticalNavItem } from './VerticalNavItem';

export function VerticalNav({ 
  className = '',
  isCollapsed = false,
  showTooltips = true,
  onItemSelect
}) {
  const { currentUser, isAdmin } = useAuth();
  
  const menuItems = filterNavigationByRole(
    NAVIGATION_ITEMS, 
    currentUser?.role, 
    isAdmin
  );

  return (
    <TooltipProvider delayDuration={0}>
      <ScrollArea className="flex-1">
        <nav 
          className={cn('flex flex-col gap-1 p-2', className)} 
          data-testid="vertical-nav"
        >
          {menuItems.map((item) => (
            <VerticalNavItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed}
              showTooltip={isCollapsed && showTooltips}
              onSelect={onItemSelect}
            />
          ))}
        </nav>
      </ScrollArea>
    </TooltipProvider>
  );
}

export default VerticalNav;
