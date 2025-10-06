import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * StatsCard Component
 * Display statistic with icon and optional trend
 * 
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main value to display
 * @param {React.ReactNode} props.icon - Icon component (from lucide-react)
 * @param {string} props.iconColor - Icon color class (optional)
 * @param {string} props.trend - Trend indicator (optional)
 * @param {string} props.description - Additional description (optional)
 */
export const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = 'text-emerald-500',
  trend,
  description,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200" data-testid="stats-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-slate-900" data-testid="stats-value">
                {value}
              </p>
              {trend && (
                <span
                  className={cn(
                    'text-sm font-medium',
                    trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {trend}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-slate-500 mt-1">{description}</p>
            )}
          </div>
          {Icon && (
            <div
              className={cn(
                'p-3 rounded-xl bg-slate-50',
                iconColor
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
