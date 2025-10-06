import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

/**
 * ConfirmDialog Component
 * Confirmation dialog for destructive actions
 * 
 * @param {Object} props
 * @param {boolean} props.open - Dialog open state
 * @param {Function} props.onOpenChange - Open state change handler
 * @param {Function} props.onConfirm - Confirm action handler
 * @param {string} props.title - Dialog title
 * @param {string} props.description - Dialog description
 * @param {string} props.confirmLabel - Confirm button label
 * @param {string} props.cancelLabel - Cancel button label
 * @param {boolean} props.destructive - Whether action is destructive (red button)
 */
export const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = true,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-testid="confirm-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle data-testid="confirm-dialog-title">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription data-testid="confirm-dialog-description">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="confirm-dialog-cancel">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={destructive ? 'bg-red-600 hover:bg-red-700' : ''}
            data-testid="confirm-dialog-confirm"
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
