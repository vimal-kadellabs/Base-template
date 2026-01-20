/**
 * Settings Page
 * Application settings and appearance customization
 */

import React from 'react';
import { ProtectedRoute } from '@/components/layout';
import { BaseLayout, PageContainer } from '@/layouts';
import { AppearanceMenu } from '@/components/appearance';
import { PageHeader } from '@/components/common';

export const SettingsPage = () => {
  return (
    <ProtectedRoute>
      <BaseLayout title="Settings">
        <PageContainer maxWidth="4xl">
          {/* Page Header */}
          <PageHeader
            title="Settings"
            description="Manage your application preferences and appearance"
          />

          {/* Appearance Settings */}
          <div className="mt-6">
            <AppearanceMenu />
          </div>
        </PageContainer>
      </BaseLayout>
    </ProtectedRoute>
  );
};

export default SettingsPage;
