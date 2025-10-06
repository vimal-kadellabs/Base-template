import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NOTIFICATION_CHANNELS } from '@/constants/config';

/**
 * NotificationConfig Component
 * Notification settings
 */
export const NotificationConfig = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  return (
    <Card data-testid="notification-config">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure notification channels and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Notifications */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="space-y-0.5">
            <Label htmlFor="emailNotif">Email Notifications</Label>
            <p className="text-sm text-slate-500">Receive notifications via email</p>
          </div>
          <Switch
            id="emailNotif"
            checked={config[NOTIFICATION_CHANNELS.EMAIL]}
            onCheckedChange={(checked) => handleChange(NOTIFICATION_CHANNELS.EMAIL, checked)}
            data-testid="email-notif-switch"
          />
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="space-y-0.5">
            <Label htmlFor="smsNotif">SMS Notifications</Label>
            <p className="text-sm text-slate-500">Receive notifications via SMS</p>
          </div>
          <Switch
            id="smsNotif"
            checked={config[NOTIFICATION_CHANNELS.SMS]}
            onCheckedChange={(checked) => handleChange(NOTIFICATION_CHANNELS.SMS, checked)}
            data-testid="sms-notif-switch"
          />
        </div>

        {/* In-App Notifications */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div className="space-y-0.5">
            <Label htmlFor="inAppNotif">In-App Notifications</Label>
            <p className="text-sm text-slate-500">Receive notifications within the app</p>
          </div>
          <Switch
            id="inAppNotif"
            checked={config[NOTIFICATION_CHANNELS.IN_APP]}
            onCheckedChange={(checked) => handleChange(NOTIFICATION_CHANNELS.IN_APP, checked)}
            data-testid="in-app-notif-switch"
          />
        </div>

        {/* Digest Frequency */}
        <div className="space-y-2 pt-4">
          <Label htmlFor="digestFrequency">Digest Frequency</Label>
          <Select
            value={config.digestFrequency}
            onValueChange={(value) => handleChange('digestFrequency', value)}
          >
            <SelectTrigger data-testid="digest-frequency-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
