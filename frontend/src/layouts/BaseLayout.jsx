/**
 * BaseLayout Component
 * Main application layout that adapts based on settings
 */

import React from 'react';
import { useNavPosition, useLayout } from '@/hooks/settings';
import { cn } from '@/lib/utils';
import { Navbar } from './navigation';
import { AppHeader } from './AppHeader';
import { MainContent } from './content';

export function BaseLayout({ 
  children, 
  title = '',
  className = '',
  showHeader = true,
  fullWidth = false
}) {
  const { isVertical, isHorizontal } = useNavPosition();
  const { sidebarCollapsed, isSticky } = useLayout();

  // Calculate content margin based on sidebar state
  const getContentMargin = () => {
    if (isHorizontal) return '';
    if (isSticky) return 'ml-[70px]';
    return sidebarCollapsed ? 'ml-[70px]' : 'ml-[280px]';
  };

  return (
    <div 
      className={cn('min-h-screen bg-background', className)} 
      data-testid="base-layout"
    >
      {/* Vertical Navigation (Sidebar) */}
      {isVertical && (
        <div className="fixed inset-y-0 left-0 z-50">
          <Navbar />
        </div>
      )}

      {/* Main Content Area */}
      <div 
        className={cn(
          'flex min-h-screen flex-col transition-[margin] duration-300',
          isVertical && getContentMargin()
        )}
      >
        {/* Header */}
        {showHeader && <AppHeader title={title} />}

        {/* Page Content */}
        <MainContent scrollable={false} className={fullWidth ? '' : ''}>
          {children}
        </MainContent>
      </div>
    </div>
  );
}

export default BaseLayout;
