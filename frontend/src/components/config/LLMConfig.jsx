import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { LLM_MODELS } from '@/constants/config';

/**
 * LLMConfig Component
 * LLM model configuration (placeholder)
 */
export const LLMConfig = ({ config, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  return (
    <Card data-testid="llm-config">
      <CardHeader>
        <CardTitle>LLM Configuration</CardTitle>
        <CardDescription>
          Configure Large Language Model settings (placeholder)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Model Selection */}
        <div className="space-y-2">
          <Label htmlFor="selectedModel">Select Model</Label>
          <Select
            value={config.selectedModel}
            onValueChange={(value) => handleChange('selectedModel', value)}
          >
            <SelectTrigger data-testid="llm-model-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LLM_MODELS.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature ({config.temperature})</Label>
          <Input
            id="temperature"
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={config.temperature}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            data-testid="llm-temperature-input"
          />
          <p className="text-xs text-slate-500">Controls randomness (0 = focused, 2 = creative)</p>
        </div>

        {/* Max Tokens */}
        <div className="space-y-2">
          <Label htmlFor="maxTokens">Max Tokens</Label>
          <Input
            id="maxTokens"
            type="number"
            min="100"
            max="4000"
            step="100"
            value={config.maxTokens}
            onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
            data-testid="llm-max-tokens-input"
          />
          <p className="text-xs text-slate-500">Maximum length of generated responses</p>
        </div>

        {/* Enable Logging */}
        <div className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <Label htmlFor="enableLogging">Enable Logging</Label>
            <p className="text-sm text-slate-500">Log LLM requests and responses</p>
          </div>
          <Switch
            id="enableLogging"
            checked={config.enableLogging}
            onCheckedChange={(checked) => handleChange('enableLogging', checked)}
            data-testid="llm-logging-switch"
          />
        </div>
      </CardContent>
    </Card>
  );
};
