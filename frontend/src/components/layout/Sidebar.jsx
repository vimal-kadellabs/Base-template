import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Sidebar Component
 * Navigation sidebar with role-based menu items
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
        'bg-slate-900 text-slate-100 transition-all duration-300 flex flex-col h-screen sticky top-0',
        isCollapsed ? 'w-20' : 'w-64'
      )}
      data-testid="sidebar"
    >
      {/* Logo and Toggle */}
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-2" data-testid="sidebar-logo">
            <Shield className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
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
                'hover:bg-slate-800 group',
                active
                  ? 'bg-emerald-500/10 text-emerald-400 border-l-4 border-emerald-400'
                  : 'text-slate-300 hover:text-white border-l-4 border-transparent'
              )}
            >
              <Icon
                className={cn(
                  'h-5 w-5 transition-colors',
                  active ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'
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
      <div className="p-4 border-t border-slate-800" data-testid="sidebar-user-info">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
            {currentUser?.username?.charAt(0).toUpperCase()}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser?.username}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {currentUser?.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
