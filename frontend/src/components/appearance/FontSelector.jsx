/**
 * FontSelector Component
 * Font family dropdown selector
 */

import React from 'react';
import { Type } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useFont } from '@/hooks/settings';

export function FontSelector({ className = '' }) {
  const { font, setFont, availableFonts, fontName } = useFont();

  return (
    <div className={cn('space-y-3', className)} data-testid="font-selector">
      <div className="flex items-center gap-2">
        <Type className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Font Family</Label>
      </div>
      
      <Select value={font} onValueChange={setFont}>
        <SelectTrigger 
          className="w-full" 
          data-testid="font-selector-trigger"
        >
          <SelectValue placeholder="Select font">
            {fontName}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableFonts.map((fontOption) => (
            <SelectItem 
              key={fontOption.id} 
              value={fontOption.id}
              data-testid={`font-option-${fontOption.id}`}
            >
              <div className="flex flex-col">
                <span 
                  className="font-medium"
                  style={{ fontFamily: fontOption.fontFamily }}
                >
                  {fontOption.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {fontOption.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default FontSelector;
