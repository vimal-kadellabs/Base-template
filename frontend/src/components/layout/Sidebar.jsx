import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  Menu,
  X,
  LayoutGrid
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Sidebar Component
 * Navigation sidebar with role-based menu items
 * Note: This is a legacy component. New layouts use the theme system.
 */
export const Sidebar = () => {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
      roles: ['user', 'admin'],
    },
    {
      name: 'User Management',
      path: ROUTES.USERS,
      icon: Users,
      roles: ['admin'],
    },
    {
      name: 'Configuration',
      path: ROUTES.CONFIG,
      icon: Settings,
      roles: ['admin'],
    },
  ];

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter((item) => {
    if (isAdmin) return true;
    return item.roles.includes(currentUser?.role);
  });

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col h-screen sticky top-0 border-r border-sidebar-border',
        isCollapsed ? 'w-20' : 'w-64'
      )}
      data-testid="sidebar"
    >
      {/* Logo and Toggle */}
      <div className="p-6 flex items-center justify-between border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2" data-testid="sidebar-logo">
            <LayoutGrid className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Admin Panel
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
          data-testid="sidebar-toggle"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2" data-testid="sidebar-nav">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-sidebar-accent group',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-colors',
                  active ? 'text-sidebar-primary-foreground' : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
                )}
              />
              {!isCollapsed && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border" data-testid="sidebar-user-info">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {currentUser?.username?.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {currentUser?.username}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {currentUser?.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
