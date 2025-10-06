import { StatsCard } from '@/components/common';
import { Users, UserCheck, UserX, Shield, Clock } from 'lucide-react';

/**
 * DashboardStats Component
 * Displays statistics grid
 */
export const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="dashboard-stats">
      <StatsCard
        title="Total Users"
        value={stats.total}
        icon={Users}
        iconColor="text-blue-500"
        description="All registered users"
      />
      <StatsCard
        title="Active Users"
        value={stats.active}
        icon={UserCheck}
        iconColor="text-green-500"
        description="Currently active"
      />
      <StatsCard
        title="Inactive Users"
        value={stats.inactive}
        icon={UserX}
        iconColor="text-red-500"
        description="Inactive accounts"
      />
      <StatsCard
        title="Recently Active"
        value={stats.recentlyActive}
        icon={Clock}
        iconColor="text-purple-500"
        description="Last 24 hours"
      />
    </div>
  );
};
