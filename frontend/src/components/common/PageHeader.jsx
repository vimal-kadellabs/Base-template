import { Button } from '@/components/ui/button';

/**
 * PageHeader Component
 * Consistent page header with title, description, and optional action button
 * 
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description (optional)
 * @param {React.ReactNode} props.action - Action button or custom component (optional)
 */
export const PageHeader = ({ title, description, action }) => {
  return (
    <div
      className="flex items-start justify-between mb-6"
      data-testid="page-header"
    >
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2" data-testid="page-header-title">
          {title}
        </h2>
        {description && (
          <p className="text-slate-600" data-testid="page-header-description">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
