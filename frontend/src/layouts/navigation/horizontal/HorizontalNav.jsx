/**
 * Horizontal Navigation Bar
 * Top navigation bar for horizontal layout
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, filterNavigationByRole } from '@/constants/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function HorizontalNav({ className = '' }) {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();
  
  const menuItems = filterNavigationByRole(
    NAVIGATION_ITEMS, 
    currentUser?.role, 
    isAdmin
  );

  const isActive = (path) => location.pathname === path;

  return (
    <NavigationMenu className={cn('max-w-none', className)} data-testid="horizontal-nav">
      <NavigationMenuList className="gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          // If item has children, render with dropdown
          if (item.children && item.children.length > 0) {
            return (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuTrigger
                  className={cn(
                    active && 'bg-accent text-accent-foreground'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-48 gap-1 p-2">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <li key={child.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={child.path}
                              className={cn(
                                'flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground',
                                isActive(child.path) && 'bg-accent text-accent-foreground'
                              )}
                            >
                              {ChildIcon && <ChildIcon className="h-4 w-4" />}
                              {child.name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          
          // Simple link without children
          return (
            <NavigationMenuItem key={item.id}>
              <Link to={item.path}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'flex items-center gap-2',
                    active && 'bg-accent text-accent-foreground'
                  )}
                  data-testid={`nav-item-${item.id}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default HorizontalNav;
