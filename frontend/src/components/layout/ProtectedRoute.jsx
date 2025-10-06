import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication and/or specific roles
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.requiredRole - Required role (optional, 'user' or 'admin')
 */
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, currentUser, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check role if required
  if (requiredRole) {
    // Admin has access to everything
    if (currentUser.role === 'admin') {
      return children;
    }

    // Check if user has required role
    if (currentUser.role !== requiredRole) {
      // Redirect to dashboard if insufficient permissions
      return <Navigate to={ROUTES.DASHBOARD} replace />;
    }
  }

  return children;
};
