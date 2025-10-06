import { ProtectedRoute, MainLayout } from '@/components/layout';
import { useAuth } from '@/hooks/useAuth';
import { UserDashboard, AdminDashboard } from '@/components/dashboard';

/**
 * DashboardPage
 * Main dashboard - shows different content based on role
 */
export const DashboardPage = () => {
  const { isAdmin } = useAuth();

  return (
    <ProtectedRoute>
      <MainLayout title="Dashboard">
        {isAdmin ? <AdminDashboard /> : <UserDashboard />}
      </MainLayout>
    </ProtectedRoute>
  );
};
