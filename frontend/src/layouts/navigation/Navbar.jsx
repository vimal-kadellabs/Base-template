/**
 * Navbar Component
 * Position-aware navigation that switches between horizontal and vertical
 */

import React from 'react';
import { useNavPosition, useLayout } from '@/hooks/settings';
import { cn } from '@/lib/utils';
import { HorizontalNav } from './horizontal';
import { ExpandableSidebar } from './vertical/expandable';
import { StickySidebar } from './vertical/sticky';

export function Navbar({ className = '' }) {
  const { isVertical, isHorizontal } = useNavPosition();
  const { isExpandable, isSticky } = useLayout();

  // Horizontal navigation
  if (isHorizontal) {
    return <HorizontalNav className={className} />;
  }

  // Vertical navigation - Expandable layout
  if (isVertical && isExpandable) {
    return <ExpandableSidebar className={className} />;
  }

  // Vertical navigation - Sticky layout
  if (isVertical && isSticky) {
    return <StickySidebar className={className} />;
  }

  // Default fallback to expandable
  return <ExpandableSidebar className={className} />;
}

export default Navbar;
