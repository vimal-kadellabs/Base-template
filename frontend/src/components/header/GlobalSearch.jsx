/**
 * GlobalSearch Component
 * Command-palette style global search with keyboard shortcut
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Users, Settings, LayoutDashboard, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { useAuth } from '@/hooks/useAuth';

// Quick actions available in search
const QUICK_ACTIONS = [
  {
    id: 'new-user',
    name: 'Add New User',
    description: 'Create a new user account',
    icon: Users,
    path: '/users',
    action: 'add-user',
    roles: ['admin'],
  },
  {
    id: 'settings',
    name: 'Open Settings',
    description: 'Manage appearance and preferences',
    icon: Settings,
    path: '/settings',
    roles: ['user', 'admin'],
  },
];

export function GlobalSearch({ className = '' }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useAuth();

  // Filter navigation items based on role
  const filteredNavItems = NAVIGATION_ITEMS.filter((item) => {
    if (isAdmin) return true;
    return item.roles?.includes(currentUser?.role);
  });

  // Filter quick actions based on role
  const filteredActions = QUICK_ACTIONS.filter((action) => {
    if (isAdmin) return true;
    return action.roles?.includes(currentUser?.role);
  });

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Handle selection
  const handleSelect = useCallback((item) => {
    setOpen(false);
    if (item.path) {
      navigate(item.path);
    }
  }, [navigate]);

  return (
    <>
      {/* Search Trigger Button */}
      <Button
        variant="outline"
        className={cn(
          'relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm text-muted-foreground sm:w-64 md:w-80',
          className
        )}
        onClick={() => setOpen(true)}
        data-testid="global-search-trigger"
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline-flex">Search...</span>
        <span className="sm:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search pages, actions, or settings..." 
          data-testid="global-search-input"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {/* Pages */}
          <CommandGroup heading="Pages">
            {filteredNavItems.map((item) => {
              const Icon = item.icon || FileText;
              return (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => handleSelect(item)}
                  className="cursor-pointer"
                  data-testid={`search-result-${item.id}`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          {/* Quick Actions */}
          <CommandGroup heading="Quick Actions">
            {filteredActions.map((action) => {
              const Icon = action.icon || FileText;
              return (
                <CommandItem
                  key={action.id}
                  value={action.name}
                  onSelect={() => handleSelect(action)}
                  className="cursor-pointer"
                  data-testid={`search-action-${action.id}`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{action.name}</span>
                    {action.description && (
                      <span className="text-xs text-muted-foreground">
                        {action.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default GlobalSearch;
