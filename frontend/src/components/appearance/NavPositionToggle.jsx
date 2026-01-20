/**
 * NavPositionToggle Component
 * Toggle between vertical and horizontal navigation
 */

import React from 'react';
import { PanelLeft, PanelTop } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useNavPosition } from '@/hooks/settings';

export function NavPositionToggle({ className = '' }) {
  const { navPosition, setNavPosition, availablePositions } = useNavPosition();

  const iconMap = {
    vertical: PanelLeft,
    horizontal: PanelTop,
  };

  return (
    <div className={cn('space-y-3', className)} data-testid="nav-position-toggle">
      <div className="flex items-center gap-2">
        <PanelLeft className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Navigation Position</Label>
      </div>
      
      <TooltipProvider>
        <ToggleGroup 
          type="single" 
          value={navPosition} 
          onValueChange={(value) => value && setNavPosition(value)}
          className="justify-start"
        >
          {availablePositions.map((position) => {
            const Icon = iconMap[position.id] || PanelLeft;
            
            return (
              <Tooltip key={position.id}>
                <TooltipTrigger asChild>
                  <ToggleGroupItem 
                    value={position.id}
                    aria-label={position.name}
                    data-testid={`nav-position-${position.id}`}
                    className="flex items-center gap-2 px-3"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{position.name}</span>
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{position.description}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </ToggleGroup>
      </TooltipProvider>
    </div>
  );
}

export default NavPositionToggle;
