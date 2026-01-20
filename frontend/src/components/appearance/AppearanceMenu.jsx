/**
 * AppearanceMenu Component
 * Combined appearance settings panel with all customization options
 */

import React from 'react';
import { Settings2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSettings } from '@/hooks/settings';
import { ColorSchemeSelector } from './ColorSchemeSelector';
import { FontSelector } from './FontSelector';
import { NavPositionToggle } from './NavPositionToggle';
import { LayoutSelector } from './LayoutSelector';

export function AppearanceMenu({ className = '' }) {
  const { resetSettings } = useSettings();

  return (
    <Card className={cn('w-full', className)} data-testid="appearance-menu">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Appearance</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetSettings}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
            data-testid="reset-settings-btn"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
        </div>
        <CardDescription>
          Customize the look and feel of the application
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Color Scheme Section */}
        <ColorSchemeSelector />
        
        <Separator />
        
        {/* Font Section */}
        <FontSelector />
        
        <Separator />
        
        {/* Navigation Position Section */}
        <NavPositionToggle />
        
        <Separator />
        
        {/* Layout Type Section (only for vertical nav) */}
        <LayoutSelector />
      </CardContent>
    </Card>
  );
}

/**
 * Compact version of AppearanceMenu for use in dropdowns/popovers
 */
export function AppearanceMenuCompact({ className = '' }) {
  const { resetSettings } = useSettings();

  return (
    <div className={cn('w-80 p-4', className)} data-testid="appearance-menu-compact">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-primary" />
          <span className="font-semibold">Appearance</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetSettings}
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
          data-testid="reset-settings-compact-btn"
        >
          <RotateCcw className="mr-1 h-3 w-3" />
          Reset
        </Button>
      </div>
      
      <ScrollArea className="h-[400px] pr-3">
        <div className="space-y-5">
          <ColorSchemeSelector />
          <Separator />
          <FontSelector />
          <Separator />
          <NavPositionToggle />
          <Separator />
          <LayoutSelector />
        </div>
      </ScrollArea>
    </div>
  );
}

export default AppearanceMenu;
