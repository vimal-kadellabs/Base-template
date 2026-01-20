import { ProtectedRoute } from '@/components/layout';
import { BaseLayout, PageContainer } from '@/layouts';
import { PageHeader } from '@/components/common';
import { UserTable, UserFilters, AddUserDialog } from '@/components/users';
import { useUsers } from '@/hooks/useUsers';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

/**
 * UsersPage
 * User management page (admin only)
 */
export const UsersPage = () => {
  const { users, addUser, updateUser, deleteUser, isLoading } = useUsers();
  const [filters, setFilters] = useState({ search: '', role: 'all', status: 'all' });
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Filter users based on current filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !filters.search ||
      user.username.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());

    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <ProtectedRoute requiredRole="admin">
      <BaseLayout title="User Management">
        <PageContainer>
          {/* Page Header */}
          <PageHeader
            title="User Management"
            description="Manage users and their permissions"
            action={
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-primary hover:bg-primary/90"
                data-testid="add-user-button"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            }
          />

          {/* Filters */}
          <div className="mt-6">
            <UserFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Users Table */}
          <div className="mt-6">
            <UserTable
              users={filteredUsers}
              onUpdate={updateUser}
              onDelete={deleteUser}
              isLoading={isLoading}
            />
          </div>

          {/* Add User Dialog */}
          <AddUserDialog
            open={showAddDialog}
            onOpenChange={setShowAddDialog}
            onAddUser={addUser}
          />
        </PageContainer>
      </BaseLayout>
    </ProtectedRoute>
  );
};
