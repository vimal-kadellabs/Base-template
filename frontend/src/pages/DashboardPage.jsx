import { ProtectedRoute } from '@/components/layout';
import { BaseLayout, PageContainer } from '@/layouts';
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
      <BaseLayout title="Dashboard">
        <PageContainer>
          {isAdmin ? <AdminDashboard /> : <UserDashboard />}
        </PageContainer>
      </BaseLayout>
    </ProtectedRoute>
  );
};
