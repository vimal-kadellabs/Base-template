import { useState } from 'react';
import { ProtectedRoute, MainLayout } from '@/components/layout';
import { PageHeader } from '@/components/common';
import { EmailConfig, NotificationConfig, AlertConfig, LLMConfig } from '@/components/config';
import { useConfig } from '@/hooks/useConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

/**
 * ConfigPage
 * Configuration management page (admin only)
 */
export const ConfigPage = () => {
  const { config, updateConfig } = useConfig();
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Local state for form changes
  const [emailConfig, setEmailConfig] = useState(config.email);
  const [notificationConfig, setNotificationConfig] = useState(config.notifications);
  const [alertConfig, setAlertConfig] = useState(config.alerts);
  const [llmConfig, setLLMConfig] = useState(config.llm);

  // Track changes
  const handleConfigChange = (section, newConfig) => {
    setHasChanges(true);
    switch (section) {
      case 'email':
        setEmailConfig(newConfig);
        break;
      case 'notifications':
        setNotificationConfig(newConfig);
        break;
      case 'alerts':
        setAlertConfig(newConfig);
        break;
      case 'llm':
        setLLMConfig(newConfig);
        break;
      default:
        break;
    }
  };

  // Save all changes
  const handleSave = () => {
    setSaving(true);
    const result = updateConfig({
      email: emailConfig,
      notifications: notificationConfig,
      alerts: alertConfig,
      llm: llmConfig,
    });

    if (result.success) {
      toast.success('Configuration saved successfully');
      setHasChanges(false);
    } else {
      toast.error(result.error || 'Failed to save configuration');
    }
    setSaving(false);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout title="Configuration">
        {/* Page Header */}
        <PageHeader
          title="Configuration"
          description="Manage application settings and preferences"
          action={
            <Button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="bg-emerald-600 hover:bg-emerald-700"
              data-testid="save-config-button"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          }
        />

        {/* Configuration Tabs */}
        <Tabs defaultValue="email" className="space-y-6" data-testid="config-tabs">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="email" data-testid="email-tab">Email</TabsTrigger>
            <TabsTrigger value="notifications" data-testid="notifications-tab">Notifications</TabsTrigger>
            <TabsTrigger value="alerts" data-testid="alerts-tab">Alerts</TabsTrigger>
            <TabsTrigger value="llm" data-testid="llm-tab">LLM</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <EmailConfig config={emailConfig} onChange={(c) => handleConfigChange('email', c)} />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <NotificationConfig config={notificationConfig} onChange={(c) => handleConfigChange('notifications', c)} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <AlertConfig config={alertConfig} onChange={(c) => handleConfigChange('alerts', c)} />
          </TabsContent>

          <TabsContent value="llm" className="space-y-4">
            <LLMConfig config={llmConfig} onChange={(c) => handleConfigChange('llm', c)} />
          </TabsContent>
        </Tabs>

        {/* Unsaved Changes Warning */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
            <p className="text-sm text-yellow-800 font-medium">
              You have unsaved changes. Don't forget to save!
            </p>
          </div>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
};
