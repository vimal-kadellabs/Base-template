/**
 * ColorSchemeSelector Component
 * Color palette selector with preview swatches
 */

import React from 'react';
import { Check, Palette } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useColorScheme } from '@/hooks/settings';

export function ColorSchemeSelector({ className = '' }) {
  const { colorScheme, setColorScheme, availableSchemes } = useColorScheme();

  return (
    <div className={cn('space-y-3', className)} data-testid="color-scheme-selector">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Color Scheme</Label>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {availableSchemes.map((scheme) => {
          const isSelected = colorScheme === scheme.id;
          
          return (
            <button
              key={scheme.id}
              onClick={() => setColorScheme(scheme.id)}
              className={cn(
                'group relative flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all hover:border-primary/50',
                isSelected ? 'border-primary bg-primary/5' : 'border-transparent bg-muted/50'
              )}
              data-testid={`color-scheme-${scheme.id}`}
              aria-label={`Select ${scheme.name} color scheme`}
              aria-pressed={isSelected}
            >
              {/* Color Preview Dots */}
              <div className="flex gap-1">
                <div 
                  className="h-4 w-4 rounded-full border border-border/50 shadow-sm" 
                  style={{ backgroundColor: scheme.preview.primary }}
                />
                <div 
                  className="h-4 w-4 rounded-full border border-border/50 shadow-sm" 
                  style={{ backgroundColor: scheme.preview.accent }}
                />
              </div>
              
              {/* Scheme Name */}
              <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">
                {scheme.name}
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
    </div>
  );
}

export default ColorSchemeSelector;
