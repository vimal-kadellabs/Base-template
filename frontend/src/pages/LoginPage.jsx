import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLoginLayout } from '@/hooks/settings';
import { LoginForm } from '@/components/auth';
import { LoginContent } from '@/components/auth/LoginContent';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

/**
 * LoginPage
 * Public login page - theme and layout aware
 */
export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loginLayout, isLeft, isCenter, isRight, showContent } = useLoginLayout();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div 
      className={cn(
        'min-h-screen flex bg-background',
        isCenter && 'items-center justify-center p-4'
      )}
      data-testid="login-page"
      data-layout={loginLayout}
    >
      {/* Left Content (when login is on right) */}
      {isRight && showContent && (
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-muted items-center justify-center p-8">
          <LoginContent />
        </div>
      )}

      {/* Login Card Container */}
      <div 
        className={cn(
          'flex items-center justify-center',
          isCenter && 'w-full max-w-md',
          (isLeft || isRight) && 'w-full lg:w-1/2 xl:w-2/5 p-4 lg:p-8'
        )}
      >
        <LoginForm />
      </div>

      {/* Right Content (when login is on left) */}
      {isLeft && showContent && (
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-muted items-center justify-center p-8">
          <LoginContent />
        </div>
      )}
    </div>
  );
};
