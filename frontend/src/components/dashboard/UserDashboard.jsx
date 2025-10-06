import { useAuth } from '@/hooks/useAuth';
import { useUsers } from '@/hooks/useUsers';
import { DashboardStats } from './DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/utils/dateHelpers';

/**
 * UserDashboard Component
 * Dashboard for regular users
 */
export const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { getStats } = useUsers();
  const stats = getStats();

  return (
    <div className="space-y-6" data-testid="user-dashboard">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {currentUser?.username}!</CardTitle>
          <CardDescription>
            You're logged in as a regular user. Here's your account information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">Username:</span>
              <span className="text-sm text-slate-900">{currentUser?.username}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">Email:</span>
              <span className="text-sm text-slate-900">{currentUser?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">Role:</span>
              <span className="text-sm text-slate-900 capitalize">{currentUser?.role}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-600">Status:</span>
              <span className="text-sm text-slate-900 capitalize">{currentUser?.status}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm font-medium text-slate-600">Member Since:</span>
              <span className="text-sm text-slate-900">{formatDate(currentUser?.createdAt, 'long')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Stats */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>Quick statistics about the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-sm text-slate-600 mt-1">Total Users</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-3xl font-bold text-slate-900">{stats.active}</p>
              <p className="text-sm text-slate-600 mt-1">Active Users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
