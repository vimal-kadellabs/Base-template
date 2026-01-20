import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "@/components/ui/sonner";
import { LoginPage, DashboardPage, UsersPage, ConfigPage, SettingsPage } from "@/pages";
import { ROUTES } from "@/constants/routes";

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            
            {/* Public Routes */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.USERS} element={<UsersPage />} />
            <Route path={ROUTES.CONFIG} element={<ConfigPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
            
            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          </Routes>
          
          {/* Toast Notifications */}
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;
