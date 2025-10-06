import { ProtectedRoute, MainLayout } from '@/components/layout';
import { PageHeader, StatsCard } from '@/components/common';
import { useUsers } from '@/hooks/useUsers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, UserX, Shield, Settings, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { getRelativeTime } from '@/utils/dateHelpers';

/**
 * AdminPanelPage
 * Admin overview and quick actions (admin only)
 */
export const AdminPanelPage = () => {
  const { users, getStats } = useUsers();
  const stats = getStats();
  const navigate = useNavigate();

  // Get recent activity (last 5 users by last login)
  const recentActivity = [...users]
    .filter((u) => u.lastLogin)
    .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
    .slice(0, 5);

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout title="Admin Panel">
        {/* Page Header */}
        <PageHeader
          title="Admin Panel"
          description="System overview and quick access to admin functions"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard title="Total Users" value={stats.total} icon={Users} iconColor="text-blue-500" />
          <StatsCard title="Active Users" value={stats.active} icon={UserCheck} iconColor="text-green-500" />
          <StatsCard title="Inactive Users" value={stats.inactive} icon={UserX} iconColor="text-red-500" />
          <StatsCard title="Administrators" value={stats.admins} icon={Shield} iconColor="text-purple-500" />
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used admin functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(ROUTES.USERS)}
                data-testid="quick-action-users"
              >
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate(ROUTES.CONFIG)}
                data-testid="quick-action-config"
              >
                <Settings className="h-4 w-4 mr-2" />
                System Configuration
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                disabled
                data-testid="quick-action-logs"
              >
                <FileText className="h-4 w-4 mr-2" />
                View System Logs
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest user logins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">No recent activity</p>
                ) : (
                  recentActivity.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xs">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{user.username}</p>
                          <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{getRelativeTime(user.lastLogin)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-1">System Status</p>
                <p className="text-2xl font-bold text-green-600">Operational</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">Active Sessions</p>
                <p className="text-2xl font-bold text-blue-600">{stats.recentlyActive}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-900 mb-1">Storage Used</p>
                <p className="text-2xl font-bold text-purple-600">LocalStorage</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </MainLayout>
    </ProtectedRoute>
  );
};
