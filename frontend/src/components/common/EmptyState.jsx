import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';

/**
 * EmptyState Component
 * Display when no data exists
 * 
 * @param {Object} props
 * @param {string} props.title - Title text
 * @param {string} props.message - Message text
 * @param {Function} props.action - Action button click handler (optional)
 * @param {string} props.actionLabel - Action button label (optional)
 * @param {React.ReactNode} props.icon - Custom icon component (optional)
 */
export const EmptyState = ({
  title = 'No data found',
  message = 'There are no items to display.',
  action,
  actionLabel = 'Add Item',
  icon: Icon = Inbox,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
      data-testid="empty-state"
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6">{message}</p>
      {action && (
        <Button onClick={action} data-testid="empty-state-action">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
