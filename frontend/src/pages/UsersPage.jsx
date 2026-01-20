import { useState } from 'react';
import { ProtectedRoute, MainLayout } from '@/components/layout';
import { PageHeader, SearchBar, FilterDropdown, StatsCard, ConfirmDialog } from '@/components/common';
import { UserTable, UserForm } from '@/components/users';
import { useUsers } from '@/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Users as UsersIcon, UserCheck, UserX, Shield } from 'lucide-react';
import { ROLES, USER_STATUS } from '@/constants/config';
import { toast } from 'sonner';

/**
 * UsersPage
 * User management page (admin only)
 */
export const UsersPage = () => {
  const { users, loading, addUser, updateUser, deleteUser, resetPassword, getFilteredUsers, getStats } = useUsers();
  const stats = getStats();

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [resettingPasswordUser, setResettingPasswordUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  // Get filtered users
  const filteredUsers = getFilteredUsers({
    search: searchTerm,
    role: roleFilter === 'all' ? null : roleFilter,
    status: statusFilter === 'all' ? null : statusFilter,
    sortBy: 'username',
    order: 'asc',
  });

  // Handle Add User
  const handleAddUser = (formData) => {
    const result = addUser(formData);
    if (result.success) {
      toast.success('User added successfully');
      setShowAddModal(false);
    } else {
      toast.error(result.error);
    }
  };

  // Handle Edit User
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (formData) => {
    const updates = { ...formData };
    // Don't update password if empty (keep existing)
    if (!updates.password) {
      delete updates.password;
    }
    
    const result = updateUser(editingUser.id, updates);
    if (result.success) {
      toast.success('User updated successfully');
      setEditingUser(null);
    } else {
      toast.error(result.error);
    }
  };

  // Handle Delete User
  const handleDeleteUser = (user) => {
    setDeletingUser(user);
  };

  const confirmDelete = () => {
    const result = deleteUser(deletingUser.id);
    if (result.success) {
      toast.success('User deleted successfully');
      setDeletingUser(null);
    } else {
      toast.error(result.error);
    }
  };

  // Handle Reset Password
  const handleResetPassword = (user) => {
    setResettingPasswordUser(user);
    setNewPassword('');
  };

  const confirmResetPassword = () => {
    if (!newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    const result = resetPassword(resettingPasswordUser.id, newPassword);
    if (result.success) {
      toast.success('Password reset successfully');
      setResettingPasswordUser(null);
      setNewPassword('');
    } else {
      toast.error(result.error);
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout title="User Management">
        {/* Page Header */}
        <PageHeader
          title="User Management"
          description="Manage all users and their permissions"
          action={
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary hover:bg-primary/90"
              data-testid="add-user-button"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard title="Total Users" value={stats.total} icon={UsersIcon} iconColor="text-blue-500" />
          <StatsCard title="Active Users" value={stats.active} icon={UserCheck} iconColor="text-green-500" />
          <StatsCard title="Inactive Users" value={stats.inactive} icon={UserX} iconColor="text-red-500" />
          <StatsCard title="Administrators" value={stats.admins} icon={Shield} iconColor="text-purple-500" />
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by username or email..."
            className="flex-1"
          />
          <FilterDropdown
            label="Role"
            options={[
              { value: 'all', label: 'All Roles' },
              { value: ROLES.ADMIN, label: 'Admin' },
              { value: ROLES.USER, label: 'User' },
            ]}
            value={roleFilter}
            onChange={setRoleFilter}
          />
          <FilterDropdown
            label="Status"
            options={[
              { value: 'all', label: 'All Status' },
              { value: USER_STATUS.ACTIVE, label: 'Active' },
              { value: USER_STATUS.INACTIVE, label: 'Inactive' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {/* User Table */}
        <UserTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onResetPassword={handleResetPassword}
        />

        {/* Add User Modal */}
        <UserForm
          open={showAddModal}
          onOpenChange={setShowAddModal}
          onSubmit={handleAddUser}
          loading={loading}
        />

        {/* Edit User Modal */}
        <UserForm
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onSubmit={handleUpdateUser}
          user={editingUser}
          loading={loading}
        />

        {/* Delete Confirmation */}
        <ConfirmDialog
          open={!!deletingUser}
          onOpenChange={(open) => !open && setDeletingUser(null)}
          onConfirm={confirmDelete}
          title="Delete User"
          description={`Are you sure you want to delete ${deletingUser?.username}? This action cannot be undone.`}
          confirmLabel="Delete"
          destructive
        />

        {/* Reset Password Dialog */}
        <Dialog
          open={!!resettingPasswordUser}
          onOpenChange={(open) => {
            if (!open) {
              setResettingPasswordUser(null);
              setNewPassword('');
            }
          }}
        >
          <DialogContent data-testid="reset-password-dialog">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter a new password for {resettingPasswordUser?.username}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                data-testid="new-password-input"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setResettingPasswordUser(null);
                  setNewPassword('');
                }}
                data-testid="reset-password-cancel"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmResetPassword}
                data-testid="reset-password-confirm"
                className="bg-primary hover:bg-primary/90"
              >
                Reset Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MainLayout>
    </ProtectedRoute>
  );
};
