/**
 * LoginLayoutSelector Component
 * Select login screen layout (left/center/right)
 */

import React from 'react';
import { PanelLeft, Square, PanelRight, Check, LogIn } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLoginLayout } from '@/hooks/settings';

export function LoginLayoutSelector({ className = '' }) {
  const { loginLayout, setLoginLayout, availableLayouts } = useLoginLayout();

  const iconMap = {
    left: PanelLeft,
    center: Square,
    right: PanelRight,
  };

  return (
    <div className={cn('space-y-3', className)} data-testid="login-layout-selector">
      <div className="flex items-center gap-2">
        <LogIn className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Login Screen Layout</Label>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {availableLayouts.map((layout) => {
          const Icon = iconMap[layout.id] || Square;
          const isSelected = loginLayout === layout.id;
          
          return (
            <button
              key={layout.id}
              onClick={() => setLoginLayout(layout.id)}
              className={cn(
                'relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all hover:border-primary/50',
                isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card'
              )}
              data-testid={`login-layout-${layout.id}`}
              aria-label={`Select ${layout.name} login layout`}
              aria-pressed={isSelected}
            >
              {/* Layout Preview */}
              <div className="w-full h-12 rounded border border-border bg-muted/50 flex items-center overflow-hidden">
                {layout.id === 'left' && (
                  <>
                    <div className="w-1/3 h-full bg-primary/20 flex items-center justify-center">
                      <div className="w-4 h-5 rounded bg-primary/40" />
                    </div>
                    <div className="w-2/3 h-full flex items-center justify-center">
                      <div className="w-8 h-1 rounded bg-muted-foreground/30" />
                    </div>
                  </>
                )}
                {layout.id === 'center' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-7 rounded bg-primary/40" />
                  </div>
                )}
                {layout.id === 'right' && (
                  <>
                    <div className="w-2/3 h-full flex items-center justify-center">
                      <div className="w-8 h-1 rounded bg-muted-foreground/30" />
                    </div>
                    <div className="w-1/3 h-full bg-primary/20 flex items-center justify-center">
                      <div className="w-4 h-5 rounded bg-primary/40" />
                    </div>
                  </>
                )}
              </div>
              
              {/* Layout Name */}
              <span className="text-xs font-medium text-foreground">
                {layout.name}
              </span>
              
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-2.5 w-2.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground">
        Choose where the login card appears on the login screen
      </p>
    </div>
  );
}

export default LoginLayoutSelector;
