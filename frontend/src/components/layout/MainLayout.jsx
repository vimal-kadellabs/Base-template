import { Sidebar } from './Sidebar';
import { Header } from './Header';

/**
 * MainLayout Component
 * Main application layout with sidebar and header
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title for header
 */
export const MainLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50" data-testid="main-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={title} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6" data-testid="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};
