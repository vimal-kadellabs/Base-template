import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

/**
 * EmailConfig Component
 * Email configuration settings
 */
export const EmailConfig = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  return (
    <Card data-testid="email-config">
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Configure SMTP settings for sending emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpServer">SMTP Server</Label>
            <Input
              id="smtpServer"
              value={config.smtpServer}
              onChange={(e) => handleChange('smtpServer', e.target.value)}
              placeholder="smtp.example.com"
              data-testid="smtp-server-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPort">SMTP Port</Label>
            <Input
              id="smtpPort"
              type="number"
              value={config.smtpPort}
              onChange={(e) => handleChange('smtpPort', parseInt(e.target.value))}
              placeholder="587"
              data-testid="smtp-port-input"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="senderEmail">Sender Email</Label>
          <Input
            id="senderEmail"
            type="email"
            value={config.senderEmail}
            onChange={(e) => handleChange('senderEmail', e.target.value)}
            placeholder="noreply@example.com"
            data-testid="sender-email-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="senderName">Sender Name</Label>
          <Input
            id="senderName"
            value={config.senderName}
            onChange={(e) => handleChange('senderName', e.target.value)}
            placeholder="Admin Panel"
            data-testid="sender-name-input"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="enableSSL">Enable SSL/TLS</Label>
            <p className="text-sm text-slate-500">Use secure connection for SMTP</p>
          </div>
          <Switch
            id="enableSSL"
            checked={config.enableSSL}
            onCheckedChange={(checked) => handleChange('enableSSL', checked)}
            data-testid="enable-ssl-switch"
          />
        </div>
      </CardContent>
    </Card>
  );
};
