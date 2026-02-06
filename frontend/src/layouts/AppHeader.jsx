/**
 * Header Component
 * Application header with global search, theme toggle and user menu
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User, ChevronDown, Settings, LayoutGrid } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavPosition } from '@/hooks/settings';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeModeToggle } from '@/components/header/ThemeModeToggle';
import { GlobalSearch } from '@/components/header/GlobalSearch';
import { HorizontalNav } from '@/layouts/navigation/horizontal';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';

export function AppHeader({ title = '' }) {
  const { currentUser, logout } = useAuth();
  const { isHorizontal } = useNavPosition();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate(ROUTES.LOGIN);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        isHorizontal ? 'px-4' : 'px-6'
      )}
      data-testid="app-header"
    >
      {/* Logo (for horizontal nav) */}
      {isHorizontal && (
        <Link 
          to={ROUTES.DASHBOARD} 
          className="mr-6 flex items-center gap-2"
          data-testid="header-logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <LayoutGrid className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold hidden sm:inline-block">
            Dashboard
          </span>
        </Link>
      )}

      {/* Horizontal Navigation */}
      {isHorizontal && (
        <div className="flex-1">
          <HorizontalNav />
        </div>
      )}

      {/* Page Title (for vertical nav) */}
      {!isHorizontal && title && (
        <div className="mr-4">
          <h1 className="text-xl font-semibold" data-testid="page-title">
            {title}
          </h1>
        </div>
      )}

      {/* Global Search (centered for vertical nav) */}
      {!isHorizontal && (
        <div className="flex-1 flex px-4">
          <GlobalSearch />
        </div>
      )}

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Global Search (for horizontal nav - compact) */}
        {isHorizontal && (
          <GlobalSearch className="w-48 md:w-64" />
        )}

        {/* Theme Toggle */}
        <ThemeModeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2"
              data-testid="user-menu-trigger"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden md:flex flex-col items-start text-left">
                <span className="text-sm font-medium">
                  {currentUser?.username || 'User'}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {currentUser?.role || 'user'}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="text-sm font-medium">{currentUser?.username}</p>
                <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate(ROUTES.SETTINGS)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
              data-testid="logout-button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AppHeader;
