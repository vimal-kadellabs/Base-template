/**
 * Settings Page
 * Application settings and appearance customization
 */

import React from 'react';
import { ProtectedRoute, MainLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { AppearanceMenu } from '@/components/appearance';

export const SettingsPage = () => {
  return (
    <ProtectedRoute>
      <MainLayout title="Settings">
        {/* Page Header */}
        <PageHeader
          title="Settings"
          description="Manage your application preferences and appearance"
        />

        {/* Appearance Settings */}
        <div className="mt-6">
          <AppearanceMenu />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default SettingsPage;
