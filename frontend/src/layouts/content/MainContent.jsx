/**
 * Main Content Component
 * Content area wrapper that adjusts based on navigation position
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MainContent({ 
  children, 
  className = '',
  scrollable = true 
}) {
  const content = (
    <main 
      className={cn(
        'flex-1 p-6',
        className
      )}
      data-testid="main-content"
    >
      {children}
    </main>
  );

  if (scrollable) {
    return (
      <ScrollArea className="flex-1">
        {content}
      </ScrollArea>
    );
  }

  return content;
}

export default MainContent;
