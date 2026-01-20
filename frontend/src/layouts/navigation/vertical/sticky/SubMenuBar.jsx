/**
 * Submenu Bar
 * Expanded submenu panel shown next to sticky icon menu
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function SubMenuBar({ 
  className = '',
  selectedItem,
  onClose,
  isOpen = false
}) {
  const location = useLocation();

  if (!isOpen || !selectedItem) {
    return null;
  }

  const Icon = selectedItem.icon;
  const hasChildren = selectedItem.children && selectedItem.children.length > 0;
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={cn(
        'flex h-screen w-[220px] flex-col border-r border-border bg-card animate-slide-in-left',
        className
      )}
      data-testid="submenu-bar"
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <span className="font-semibold text-foreground">
            {selectedItem.name}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7"
          data-testid="submenu-close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {/* Main Link */}
          <Link
            to={selectedItem.path}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive(selectedItem.path) && 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
            data-testid={`submenu-main-${selectedItem.id}`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>Overview</span>
          </Link>

          {/* Children */}
          {hasChildren && (
            <>
              <Separator className="my-3" />
              <div className="space-y-1">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {selectedItem.name}
                </p>
                {selectedItem.children.map((child) => {
                  const ChildIcon = child.icon;
                  return (
                    <Link
                      key={child.id}
                      to={child.path}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        isActive(child.path) && 'bg-accent text-accent-foreground font-medium'
                      )}
                      data-testid={`submenu-child-${child.id}`}
                    >
                      {ChildIcon && <ChildIcon className="h-4 w-4" />}
                      <span>{child.name}</span>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default SubMenuBar;
