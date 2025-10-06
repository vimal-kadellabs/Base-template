# Component Quick Reference

## Layout Components

### ProtectedRoute
```javascript
import { ProtectedRoute } from '@/components/layout';

// Basic protection (requires login)
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

// Role-based protection
<ProtectedRoute requiredRole="admin">
  <AdminComponent />
</ProtectedRoute>
```

### MainLayout
```javascript
import { MainLayout } from '@/components/layout';

<MainLayout title="Page Title">
  {/* Your page content */}
</MainLayout>
```

### Sidebar (Auto-included in MainLayout)
- Automatically shows role-based menu
- Collapsible with toggle button
- Shows current user info

### Header (Auto-included in MainLayout)
- Shows page title
- User dropdown with logout

---

## Common Components

### StatsCard
```javascript
import { StatsCard } from '@/components/common';
import { Users } from 'lucide-react';

<StatsCard
  title="Total Users"
  value={120}
  icon={Users}
  iconColor="text-blue-500"
  trend="+12%"
  description="vs last month"
/>
```

### SearchBar
```javascript
import { SearchBar } from '@/components/common';

const [search, setSearch] = useState('');

<SearchBar
  value={search}
  onChange={setSearch}
  placeholder="Search..."
/>
```

### FilterDropdown
```javascript
import { FilterDropdown } from '@/components/common';

const options = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
];

<FilterDropdown
  label="Status"
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

### EmptyState
```javascript
import { EmptyState } from '@/components/common';
import { Users } from 'lucide-react';

<EmptyState
  title="No users found"
  message="Add your first user to get started"
  icon={Users}
  action={() => handleAdd()}
  actionLabel="Add User"
/>
```

### ConfirmDialog
```javascript
import { ConfirmDialog } from '@/components/common';

const [open, setOpen] = useState(false);

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  onConfirm={handleDelete}
  title="Delete User"
  description="This action cannot be undone"
  destructive={true}
/>
```

### PageHeader
```javascript
import { PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

<PageHeader
  title="User Management"
  description="Manage all users"
  action={
    <Button onClick={handleAdd}>
      <Plus className="h-4 w-4 mr-2" />
      Add User
    </Button>
  }
/>
```

---

## Complete Page Example

```javascript
import { ProtectedRoute, MainLayout } from '@/components/layout';
import { PageHeader, StatsCard, SearchBar, FilterDropdown } from '@/components/common';
import { Users, UserCheck, UserX } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import { useState } from 'react';

function UsersPage() {
  const { users, getStats, getFilteredUsers } = useUsers();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const stats = getStats();
  const filteredUsers = getFilteredUsers({
    search,
    role: roleFilter === 'all' ? null : roleFilter,
  });

  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout title="User Management">
        {/* Page Header */}
        <PageHeader
          title="User Management"
          description="Manage all users and their permissions"
          action={
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          }
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatsCard
            title="Total Users"
            value={stats.total}
            icon={Users}
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Active Users"
            value={stats.active}
            icon={UserCheck}
            iconColor="text-green-500"
          />
          <StatsCard
            title="Inactive Users"
            value={stats.inactive}
            icon={UserX}
            iconColor="text-red-500"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search users..."
            className="flex-1"
          />
          <FilterDropdown
            label="Role"
            options={[
              { value: 'all', label: 'All Roles' },
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
            ]}
            value={roleFilter}
            onChange={setRoleFilter}
          />
        </div>

        {/* User List */}
        {filteredUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            message="Try adjusting your search or filters"
          />
        ) : (
          <UserTable users={filteredUsers} />
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}
```

---

## Color System

### Primary Colors
- Emerald: `emerald-400`, `emerald-500`, `emerald-600`
- Teal: `teal-400`, `teal-500`
- Slate: `slate-50`, `slate-900`

### Status Colors
- Success: `green-600`
- Error: `red-600`
- Warning: `yellow-600`
- Info: `blue-600`

### Usage
```javascript
// Good - using defined colors
<StatsCard iconColor="text-emerald-500" />
<Button className="bg-emerald-600 hover:bg-emerald-700" />

// Avoid - don't use purple/blue gradients
// ❌ from-purple-500 to-blue-600
```

---

## Icons

### Using Lucide React Icons
```javascript
import { 
  Users, UserCheck, UserX, UserPlus,
  Settings, Shield, LayoutDashboard,
  Search, Filter, Plus, Trash2, Edit,
  LogOut, Menu, X, ChevronDown
} from 'lucide-react';

// In components
<Users className="h-5 w-5" />
<Plus className="h-4 w-4 mr-2" />
```

### Common Icon Patterns
- Navigation: `h-5 w-5`
- Buttons: `h-4 w-4 mr-2`
- Large icons: `h-6 w-6` or `h-8 w-8`

---

## Data Test IDs

All components include `data-testid` attributes:

### Layout
- `sidebar`, `sidebar-toggle`, `sidebar-nav`
- `header`, `page-title`, `logout-button`
- `main-layout`, `main-content`

### Common
- `stats-card`, `stats-value`
- `search-bar`, `search-input`
- `filter-dropdown`, `filter-trigger`
- `empty-state`, `empty-state-action`
- `confirm-dialog`, `confirm-dialog-confirm`
- `page-header`, `page-header-title`

---

## Responsive Design

### Grid Layouts
```javascript
// 1 column on mobile, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// 1 column on mobile, 2 on tablet, 4 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

### Flex Layouts
```javascript
// Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
```

---

## Best Practices

1. **Always wrap protected pages with ProtectedRoute**
2. **Use MainLayout for consistent structure**
3. **Use PageHeader for page titles**
4. **Use StatsCard for metrics display**
5. **Use EmptyState when no data**
6. **Use ConfirmDialog for destructive actions**
7. **Include data-testid on interactive elements**
8. **Use proper spacing (p-6, space-y-6, gap-6)**
9. **Use icons from lucide-react only**
10. **Follow color system (emerald/teal/slate)**
