/**
 * LayoutSelector Component
 * Select between expandable sidebar and sticky menu layouts
 */

import React from 'react';
import { LayoutList, PanelLeftClose, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLayout, useNavPosition } from '@/hooks/settings';

export function LayoutSelector({ className = '' }) {
  const { layoutType, setLayoutType, availableLayouts } = useLayout();
  const { isVertical } = useNavPosition();

  const iconMap = {
    expandable: PanelLeftClose,
    sticky: LayoutList,
  };

  // Only show layout selector for vertical navigation
  if (!isVertical) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)} data-testid="layout-selector">
      <div className="flex items-center gap-2">
        <LayoutList className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Sidebar Layout</Label>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {availableLayouts.map((layout) => {
          const Icon = iconMap[layout.id] || LayoutList;
          const isSelected = layoutType === layout.id;
          
          return (
            <button
              key={layout.id}
              onClick={() => setLayoutType(layout.id)}
              className={cn(
                'relative flex flex-col items-start gap-2 rounded-lg border-2 p-3 text-left transition-all hover:border-primary/50',
                isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card'
              )}
              data-testid={`layout-type-${layout.id}`}
              aria-label={`Select ${layout.name} layout`}
              aria-pressed={isSelected}
            >
              {/* Layout Preview Icon */}
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-md',
                isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}>
                <Icon className="h-5 w-5" />
              </div>
              
              {/* Layout Info */}
              <div className="space-y-0.5">
                <span className="text-sm font-medium">{layout.name}</span>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {layout.description}
                </p>
              </div>
              
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LayoutSelector;
