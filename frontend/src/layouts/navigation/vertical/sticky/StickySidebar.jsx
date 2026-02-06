/**
 * Sticky Sidebar
 * Combined sticky icon menu with submenu bar
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS, getNavigationItemByPath } from '@/constants/navigation';
import { StickyIconMenu } from './StickyIconMenu';
import { SubMenuBar } from './SubMenuBar';

export function StickySidebar({ className = '' }) {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  // Auto-select based on current route
  useEffect(() => {
    const currentItem = getNavigationItemByPath(location.pathname);
    if (currentItem) {
      setSelectedItem(currentItem);
    }
  }, [location.pathname]);

  const handleItemSelect = (item) => {
    if (selectedItem?.id === item.id && isSubmenuOpen) {
      // Toggle off if clicking same item
      setIsSubmenuOpen(false);
    } else {
      setSelectedItem(item);
      setIsSubmenuOpen(true);
    }
  };

  const handleCloseSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <div className={cn('flex h-screen', className)} data-testid="sticky-sidebar">
      {/* Icon Menu */}
      <StickyIconMenu
        selectedItem={isSubmenuOpen ? selectedItem : null}
        onItemSelect={handleItemSelect}
      />
      
      {/* Submenu Bar */}
      <SubMenuBar
        selectedItem={selectedItem}
        isOpen={isSubmenuOpen}
        onClose={handleCloseSubmenu}
      />
    </div>
  );
}

export default StickySidebar;
