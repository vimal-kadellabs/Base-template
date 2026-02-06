/**
 * Expandable Sidebar
 * Collapsible sidebar that can expand/collapse
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PanelLeftClose, PanelLeft, LayoutGrid } from 'lucide-react';
import { useLayout } from '@/hooks/settings';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VerticalNav } from '../VerticalNav';
import { ROUTES } from '@/constants/routes';

export function ExpandableSidebar({ className = '' }) {
  const { sidebarCollapsed, toggleSidebar } = useLayout();

  return (
    <aside
      className={cn(
        'flex h-screen flex-col border-r border-sidebar-border bg-sidebar sidebar-transition',
        sidebarCollapsed ? 'w-[70px]' : 'w-[280px]',
        className
      )}
      data-testid="expandable-sidebar"
      data-collapsed={sidebarCollapsed}
    >
      {/* Header */}
      <div className={cn(
        'flex h-16 items-center border-b border-sidebar-border px-4',
        sidebarCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!sidebarCollapsed && (
          <Link 
            to={ROUTES.DASHBOARD} 
            className="flex items-center gap-2"
            data-testid="sidebar-logo"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutGrid className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">
              Dashboard
            </span>
          </Link>
        )}
        
        {sidebarCollapsed && (
          <Link to={ROUTES.DASHBOARD} data-testid="sidebar-logo-collapsed">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <LayoutGrid className="h-5 w-5 text-primary-foreground" />
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <VerticalNav 
        isCollapsed={sidebarCollapsed} 
        showTooltips={true}
      />

      {/* Footer with toggle button only */}
      <div className="mt-auto border-t border-sidebar-border">
        <div className={cn(
          'flex items-center p-3',
          sidebarCollapsed ? 'justify-center' : 'justify-end'
        )}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            data-testid="sidebar-toggle"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default ExpandableSidebar;
