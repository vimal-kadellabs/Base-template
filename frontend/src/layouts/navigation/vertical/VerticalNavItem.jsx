/**
 * Vertical Navigation Item
 * Individual menu item for vertical navigation
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function VerticalNavItem({ 
  item, 
  isCollapsed = false,
  showTooltip = false,
  onSelect,
  level = 0
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const Icon = item.icon;
  const isActive = location.pathname === item.path;
  const hasChildren = item.children && item.children.length > 0;

  // Base styles for menu items
  const itemStyles = cn(
    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
    isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90',
    !isActive && 'text-sidebar-foreground',
    level > 0 && 'ml-4 text-[13px]'
  );

  // Collapsed state - icon only with tooltip
  if (isCollapsed && showTooltip) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            to={item.path}
            onClick={() => onSelect?.(item)}
            className={cn(
              itemStyles,
              'justify-center px-2'
            )}
            data-testid={`nav-item-${item.id}`}
          >
            {Icon && <Icon className="h-5 w-5 shrink-0" />}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="flex items-center gap-2">
          {item.name}
          {hasChildren && <ChevronRight className="h-4 w-4" />}
        </TooltipContent>
      </Tooltip>
    );
  }

  // Item with children - collapsible
  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(itemStyles, 'w-full justify-between')}
            data-testid={`nav-item-${item.id}`}
          >
            <div className="flex items-center gap-3">
              {Icon && <Icon className="h-5 w-5 shrink-0" />}
              <span>{item.name}</span>
            </div>
            <ChevronDown 
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                isOpen && 'rotate-180'
              )} 
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 space-y-1">
          {item.children.map((child) => (
            <VerticalNavItem 
              key={child.id} 
              item={child} 
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Simple link item
  return (
    <Link
      to={item.path}
      onClick={() => onSelect?.(item)}
      className={itemStyles}
      data-testid={`nav-item-${item.id}`}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0" />}
      {!isCollapsed && <span>{item.name}</span>}
    </Link>
  );
}

export default VerticalNavItem;
