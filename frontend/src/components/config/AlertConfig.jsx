import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

/**
 * AlertConfig Component
 * Alert settings
 */
export const AlertConfig = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleThresholdChange = (alertType, value) => {
    onChange({
      ...config,
      thresholds: {
        ...config.thresholds,
        [alertType]: parseInt(value) || 0,
      },
    });
  };

  const handleAlertTypeChange = (alertType, value) => {
    onChange({
      ...config,
      alertTypes: {
        ...config.alertTypes,
        [alertType]: value,
      },
    });
  };

  return (
    <Card data-testid="alert-config">
      <CardHeader>
        <CardTitle>Alert Settings</CardTitle>
        <CardDescription>
          Configure alert thresholds and notification channels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Enable Alerts */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="space-y-0.5">
            <Label htmlFor="enableAlerts">Enable Alerts</Label>
            <p className="text-sm text-muted-foreground">Turn on/off all alert notifications</p>
          </div>
          <Switch
            id="enableAlerts"
            checked={config.enableAlerts}
            onCheckedChange={(checked) => handleChange('enableAlerts', checked)}
            data-testid="enable-alerts-switch"
          />
        </div>

        {/* Alert Thresholds */}
        <div className="pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Alert Thresholds</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="infoThreshold">Info</Label>
                <Input
                  id="infoThreshold"
                  type="number"
                  value={config.thresholds?.info || 10}
                  onChange={(e) => handleThresholdChange('info', e.target.value)}
                  data-testid="info-threshold-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warningThreshold">Warning</Label>
                <Input
                  id="warningThreshold"
                  type="number"
                  value={config.thresholds?.warning || 5}
                  onChange={(e) => handleThresholdChange('warning', e.target.value)}
                  data-testid="warning-threshold-input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="errorThreshold">Error</Label>
                <Input
                  id="errorThreshold"
                  type="number"
                  value={config.thresholds?.error || 1}
                  onChange={(e) => handleThresholdChange('error', e.target.value)}
                  data-testid="error-threshold-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criticalThreshold">Critical</Label>
                <Input
                  id="criticalThreshold"
                  type="number"
                  value={config.thresholds?.critical || 1}
                  onChange={(e) => handleThresholdChange('critical', e.target.value)}
                  data-testid="critical-threshold-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Alert Types */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Alert Types</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="systemErrors">System Errors</Label>
              <Switch
                id="systemErrors"
                checked={config.alertTypes?.systemErrors}
                onCheckedChange={(checked) => handleAlertTypeChange('systemErrors', checked)}
                data-testid="system-errors-switch"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="securityEvents">Security Events</Label>
              <Switch
                id="securityEvents"
                checked={config.alertTypes?.securityEvents}
                onCheckedChange={(checked) => handleAlertTypeChange('securityEvents', checked)}
                data-testid="security-events-switch"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="performanceIssues">Performance Issues</Label>
              <Switch
                id="performanceIssues"
                checked={config.alertTypes?.performanceIssues}
                onCheckedChange={(checked) => handleAlertTypeChange('performanceIssues', checked)}
                data-testid="performance-issues-switch"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="userActivity">User Activity</Label>
              <Switch
                id="userActivity"
                checked={config.alertTypes?.userActivity}
                onCheckedChange={(checked) => handleAlertTypeChange('userActivity', checked)}
                data-testid="user-activity-switch"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
