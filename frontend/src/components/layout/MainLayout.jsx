/**
 * MainLayout Component
 * Main application layout with sidebar and header
 * Now uses the new theme-aware BaseLayout system
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title for header
 */

import { BaseLayout, PageContainer } from '@/layouts';

export const MainLayout = ({ children, title }) => {
  return (
    <BaseLayout title={title}>
      <PageContainer>
        {children}
      </PageContainer>
    </BaseLayout>
  );
};
