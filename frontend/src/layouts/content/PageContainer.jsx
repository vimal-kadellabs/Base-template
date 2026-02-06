/**
 * Page Container Component
 * Wrapper for page-level content with consistent spacing
 */

import React from 'react';
import { cn } from '@/lib/utils';

export function PageContainer({ 
  children, 
  className = '',
  maxWidth = '7xl' 
}) {
  const maxWidthClasses = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
    'none': '',
  };

  return (
    <div 
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth] || maxWidthClasses['7xl'],
        className
      )}
      data-testid="page-container"
    >
      {children}
    </div>
  );
}

export default PageContainer;
