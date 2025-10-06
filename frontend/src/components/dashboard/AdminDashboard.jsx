import { useAuth } from '@/hooks/useAuth';
import { useUsers } from '@/hooks/useUsers';
import { DashboardStats } from './DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRelativeTime } from '@/utils/dateHelpers';
import { Badge } from '@/components/ui/badge';

/**
 * AdminDashboard Component
 * Dashboard for admin users with more detailed stats
 */
export const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { users, getStats } = useUsers();
  const stats = getStats();

  // Get recent users (last 5)
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-6" data-testid="admin-dashboard">
      {/* Welcome Message */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Welcome back, {currentUser?.username}!
        </h2>
        <p className="text-slate-600">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Recent Users and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No users found</p>
              ) : (
                recentUsers.map((user) => (
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
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={user.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {user.role}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">
                        {getRelativeTime(user.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Role Distribution</CardTitle>
            <CardDescription>User roles breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Administrators</span>
                  <span className="text-sm font-bold text-slate-900">{stats.admins}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(stats.admins / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Regular Users</span>
                  <span className="text-sm font-bold text-slate-900">{stats.regularUsers}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(stats.regularUsers / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-600">Active / Total</span>
                  <span className="text-sm font-bold text-slate-900">
                    {stats.active} / {stats.total}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(stats.active / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
