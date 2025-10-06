import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ROLES, USER_STATUS } from '@/constants/config';

/**
 * UserForm Component
 * Form for adding or editing users
 */
export const UserForm = ({ open, onOpenChange, onSubmit, user, loading }) => {
  const isEdit = !!user;
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ROLES.USER,
    status: USER_STATUS.ACTIVE,
  });

  // Populate form when editing
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '', // Don't populate password for security
        role: user.role,
        status: user.status,
      });
    } else {
      // Reset form when adding new user
      setFormData({
        username: '',
        email: '',
        password: '',
        role: ROLES.USER,
        status: USER_STATUS.ACTIVE,
      });
    }
  }, [user, open]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="user-form-dialog">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update user information. Leave password empty to keep current password.'
              : 'Create a new user account with the details below.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="Enter username"
              required
              disabled={loading}
              data-testid="user-form-username"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email"
              required
              disabled={loading}
              data-testid="user-form-email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password {isEdit && '(leave empty to keep current)'}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter password"
              required={!isEdit}
              disabled={loading}
              data-testid="user-form-password"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => handleChange('role', value)}
              disabled={loading}
            >
              <SelectTrigger data-testid="user-form-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ROLES.USER}>User</SelectItem>
                <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange('status', value)}
              disabled={loading}
            >
              <SelectTrigger data-testid="user-form-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={USER_STATUS.ACTIVE}>Active</SelectItem>
                <SelectItem value={USER_STATUS.INACTIVE}>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              data-testid="user-form-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              data-testid="user-form-submit"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? 'Saving...' : isEdit ? 'Update User' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
