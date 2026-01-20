import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, KeyRound } from 'lucide-react';
import { formatDate, getRelativeTime } from '@/utils/dateHelpers';
import { EmptyState } from '@/components/common';
import { Users } from 'lucide-react';

/**
 * UserTable Component
 * Display users in a table with actions
 */
export const UserTable = ({ users, onEdit, onDelete, onResetPassword }) => {
  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No users found"
        message="No users match your search criteria. Try adjusting your filters."
      />
    );
  }

  return (
    <div className="border rounded-lg" data-testid="user-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.username}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === 'admin' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {user.lastLogin ? getRelativeTime(user.lastLogin) : 'Never'}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(user.createdAt, 'short')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(user)}
                    data-testid={`edit-user-${user.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onResetPassword(user)}
                    data-testid={`reset-password-${user.id}`}
                  >
                    <KeyRound className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(user)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    data-testid={`delete-user-${user.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
