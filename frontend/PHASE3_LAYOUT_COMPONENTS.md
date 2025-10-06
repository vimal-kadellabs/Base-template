# Phase 3: Layout & Common Components - Implementation Complete ✅

## Overview
This document describes the Layout and Common Components implementation that provides the structural foundation and reusable UI components for the Admin Panel application.

## Project Structure

```
/app/frontend/src/components/
├── layout/
│   ├── ProtectedRoute.jsx  # Route authentication wrapper
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── Header.jsx          # Top navigation header
│   ├── MainLayout.jsx      # Main layout wrapper
│   └── index.js            # Centralized exports
└── common/
    ├── StatsCard.jsx       # Statistics display card
    ├── SearchBar.jsx       # Search input with icon
    ├── FilterDropdown.jsx  # Filter dropdown select
    ├── EmptyState.jsx      # No data placeholder
    ├── ConfirmDialog.jsx   # Confirmation dialog
    ├── PageHeader.jsx      # Page header with actions
    └── index.js            # Centralized exports
```

---

## 🏗️ Layout Components

### 1. ProtectedRoute Component

**File**: `/components/layout/ProtectedRoute.jsx`

**Purpose**: Wraps routes that require authentication and/or specific roles

**Props**:
- `children` (ReactNode) - Child components to render
- `requiredRole` (string, optional) - Required role ('user' or 'admin')

**Features**:
- Auto-redirects to login if not authenticated
- Shows loading spinner while checking auth status
- Role-based access control
- Admins automatically have access to all routes
- Redirects to dashboard if insufficient permissions

**Usage**:
```javascript
import { ProtectedRoute } from '@/components/layout';

// Public route (no protection)
<Route path="/login" element={<LoginPage />} />

// Protected route (requires authentication)
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>

// Admin-only route
<Route 
  path="/users" 
  element={
    <ProtectedRoute requiredRole="admin">
      <UsersPage />
    </ProtectedRoute>
  } 
/>
```

**Behavior**:
1. Not authenticated → Redirect to `/login`
2. Authenticated but wrong role → Redirect to `/dashboard`
3. Authenticated with correct role → Render children
4. Loading → Show spinner

---

### 2. Sidebar Component

**File**: `/components/layout/Sidebar.jsx`

**Purpose**: Navigation sidebar with role-based menu items

**Features**:
- **Collapsible sidebar** - Toggle button to expand/collapse
- **Role-based menu** - Shows only allowed menu items
- **Active route highlighting** - Visual indicator for current page
- **User info display** - Shows username and role at bottom
- **Modern design** - Gradient logo, smooth animations
- **Responsive icons** - Lucide React icons with hover effects

**Menu Items**:
- Dashboard (all users)
- User Management (admin only)
- Configuration (admin only)
- Admin Panel (admin only)

**Design**:
- Dark theme (slate-900 background)
- Emerald/teal accent colors
- Smooth transitions on collapse/expand
- Active state with border and background

**Data Test IDs**:
- `sidebar` - Main sidebar container
- `sidebar-logo` - Logo section
- `sidebar-toggle` - Collapse/expand button
- `sidebar-nav` - Navigation menu
- `nav-link-{name}` - Individual nav links
- `sidebar-user-info` - User info section

---

### 3. Header Component

**File**: `/components/layout/Header.jsx`

**Purpose**: Top navigation bar with page title and user menu

**Props**:
- `title` (string) - Page title to display

**Features**:
- **Page title display** - Dynamic title based on current page
- **User dropdown menu** - Profile info and logout
- **Logout functionality** - Integrated with useAuth hook
- **Toast notification** - Success message on logout
- **Responsive design** - Adapts to screen sizes

**User Menu Items**:
- User info (username, email)
- Profile (placeholder)
- Logout (functional)

**Design**:
- White background with subtle border
- Sticky positioning
- Gradient avatar with initial
- Dropdown with shadcn components

**Data Test IDs**:
- `header` - Header container
- `page-title` - Page title text
- `user-menu-trigger` - User menu button
- `logout-button` - Logout menu item

---

### 4. MainLayout Component

**File**: `/components/layout/MainLayout.jsx`

**Purpose**: Main application layout combining sidebar and header

**Props**:
- `children` (ReactNode) - Page content to render
- `title` (string) - Page title for header

**Structure**:
```
┌─────────────────────────────────────┐
│         Sidebar      │    Header    │
│       (sticky)       │   (sticky)   │
├──────────────────────┼──────────────┤
│                      │              │
│      Navigation      │   Content    │
│       (fixed)        │  (scrollable)│
│                      │              │
│                      │              │
└──────────────────────┴──────────────┘
```

**Features**:
- Flexbox layout with sidebar and main content
- Sidebar remains fixed while content scrolls
- Header is sticky at top
- Main content area is scrollable
- Light background (slate-50)

**Usage**:
```javascript
import { MainLayout } from '@/components/layout';

function DashboardPage() {
  return (
    <MainLayout title="Dashboard">
      <div>Your page content here</div>
    </MainLayout>
  );
}
```

**Data Test IDs**:
- `main-layout` - Layout container
- `main-content` - Content area

---

## 🎨 Common Components

### 1. StatsCard Component

**File**: `/components/common/StatsCard.jsx`

**Purpose**: Display statistics with icon and optional trend

**Props**:
- `title` (string) - Card title
- `value` (string|number) - Main value to display
- `icon` (Component) - Icon component from lucide-react
- `iconColor` (string) - Icon color class (default: 'text-emerald-500')
- `trend` (string, optional) - Trend indicator (e.g., '+12%', '-5%')
- `description` (string, optional) - Additional description

**Features**:
- Hover shadow effect
- Large value display
- Color-coded trends (green for positive, red for negative)
- Icon with background
- Responsive layout

**Usage**:
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

**Data Test IDs**:
- `stats-card` - Card container
- `stats-value` - Main value display

---

### 2. SearchBar Component

**File**: `/components/common/SearchBar.jsx`

**Purpose**: Search input with search icon

**Props**:
- `value` (string) - Search value
- `onChange` (function) - Change handler
- `placeholder` (string) - Placeholder text
- `className` (string) - Additional CSS classes

**Features**:
- Search icon on left
- Clean, minimal design
- Instant search (controlled input)

**Usage**:
```javascript
import { SearchBar } from '@/components/common';

const [search, setSearch] = useState('');

<SearchBar
  value={search}
  onChange={setSearch}
  placeholder="Search users..."
/>
```

**Data Test IDs**:
- `search-bar` - Container
- `search-input` - Input element

---

### 3. FilterDropdown Component

**File**: `/components/common/FilterDropdown.jsx`

**Purpose**: Generic filter dropdown with label

**Props**:
- `options` (array) - Array of `{ value, label }` objects
- `value` (string) - Selected value
- `onChange` (function) - Change handler
- `label` (string) - Label text
- `placeholder` (string) - Placeholder text

**Features**:
- Label support
- Shadcn Select component
- Clean dropdown styling
- Keyboard accessible

**Usage**:
```javascript
import { FilterDropdown } from '@/components/common';

const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

<FilterDropdown
  label="Filter by Role"
  options={roleOptions}
  value={selectedRole}
  onChange={setSelectedRole}
  placeholder="Select role..."
/>
```

**Data Test IDs**:
- `filter-dropdown` - Container
- `filter-trigger` - Dropdown trigger
- `filter-option-{value}` - Individual options

---

### 4. EmptyState Component

**File**: `/components/common/EmptyState.jsx`

**Purpose**: Display when no data exists

**Props**:
- `title` (string) - Title text
- `message` (string) - Message text
- `action` (function, optional) - Action button handler
- `actionLabel` (string, optional) - Action button label
- `icon` (Component, optional) - Custom icon (default: Inbox)

**Features**:
- Centered layout
- Custom icon support
- Optional action button
- Friendly, informative design

**Usage**:
```javascript
import { EmptyState } from '@/components/common';
import { Users } from 'lucide-react';

<EmptyState
  title="No users found"
  message="Get started by adding your first user."
  icon={Users}
  action={() => setShowAddModal(true)}
  actionLabel="Add User"
/>
```

**Data Test IDs**:
- `empty-state` - Container
- `empty-state-action` - Action button

---

### 5. ConfirmDialog Component

**File**: `/components/common/ConfirmDialog.jsx`

**Purpose**: Confirmation dialog for destructive actions

**Props**:
- `open` (boolean) - Dialog open state
- `onOpenChange` (function) - Open state change handler
- `onConfirm` (function) - Confirm action handler
- `title` (string) - Dialog title
- `description` (string) - Dialog description
- `confirmLabel` (string) - Confirm button label
- `cancelLabel` (string) - Cancel button label
- `destructive` (boolean) - Red button for destructive actions

**Features**:
- Modal overlay
- Keyboard accessible (ESC to close)
- Focus trap
- Destructive action styling (red button)

**Usage**:
```javascript
import { ConfirmDialog } from '@/components/common';

const [showConfirm, setShowConfirm] = useState(false);

<ConfirmDialog
  open={showConfirm}
  onOpenChange={setShowConfirm}
  onConfirm={handleDelete}
  title="Delete User"
  description="Are you sure you want to delete this user? This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  destructive={true}
/>
```

**Data Test IDs**:
- `confirm-dialog` - Dialog container
- `confirm-dialog-title` - Title
- `confirm-dialog-description` - Description
- `confirm-dialog-cancel` - Cancel button
- `confirm-dialog-confirm` - Confirm button

---

### 6. PageHeader Component

**File**: `/components/common/PageHeader.jsx`

**Purpose**: Consistent page header with title and action button

**Props**:
- `title` (string) - Page title
- `description` (string, optional) - Page description
- `action` (ReactNode, optional) - Action button or custom component

**Features**:
- Large, bold title
- Optional description
- Flexible action area (can be button or custom component)
- Consistent spacing

**Usage**:
```javascript
import { PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

<PageHeader
  title="User Management"
  description="Manage all users and their permissions"
  action={
    <Button onClick={handleAdd}>
      <Plus className="h-4 w-4 mr-2" />
      Add User
    </Button>
  }
/>
```

**Data Test IDs**:
- `page-header` - Container
- `page-header-title` - Title
- `page-header-description` - Description

---

## 🎨 Design Specifications

### Color Palette

**Primary Colors**:
- Emerald: `emerald-400`, `emerald-500`
- Teal: `teal-400`, `teal-500`
- Slate: `slate-50` (background), `slate-900` (sidebar)

**Text Colors**:
- Primary: `slate-900`
- Secondary: `slate-600`
- Muted: `slate-500`, `slate-400`

**Status Colors**:
- Success/Positive: `green-600`
- Error/Negative: `red-600`
- Warning: `yellow-600`
- Info: `blue-600`

### Typography

**Headings**:
- Page Title: `text-3xl font-bold`
- Section Title: `text-2xl font-bold`
- Card Title: `text-xl font-semibold`
- Stat Value: `text-3xl font-bold`

**Body Text**:
- Regular: `text-base`
- Small: `text-sm`
- Extra Small: `text-xs`

**Font Family**: Default system fonts (will be customized in later phases)

### Spacing

- Container padding: `p-6`
- Section spacing: `space-y-6`
- Card padding: `p-6`
- Component spacing: `space-x-4`, `space-y-4`

### Borders & Shadows

- Card border: `border border-slate-200`
- Card shadow: `hover:shadow-lg`
- Sidebar border: `border-b border-slate-800`
- Header border: `border-b border-slate-200`

---

## 🔄 Component Composition Patterns

### Pattern 1: Protected Page with Layout

```javascript
import { ProtectedRoute } from '@/components/layout';
import { MainLayout } from '@/components/layout';

function UsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <MainLayout title="User Management">
        {/* Page content */}
      </MainLayout>
    </ProtectedRoute>
  );
}
```

### Pattern 2: Page with Header and Stats

```javascript
import { PageHeader, StatsCard } from '@/components/common';
import { Users, UserCheck } from 'lucide-react';

function Dashboard() {
  return (
    <MainLayout title="Dashboard">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your overview."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value={120}
          icon={Users}
          trend="+12%"
        />
        <StatsCard
          title="Active Users"
          value={95}
          icon={UserCheck}
          trend="+5%"
        />
      </div>
    </MainLayout>
  );
}
```

### Pattern 3: List Page with Search and Filter

```javascript
import { SearchBar, FilterDropdown, EmptyState } from '@/components/common';
import { useState } from 'react';

function UsersList() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search users..."
          className="flex-1"
        />
        <FilterDropdown
          label="Role"
          options={roleOptions}
          value={filter}
          onChange={setFilter}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          message="Try adjusting your filters"
        />
      ) : (
        <UserTable users={filteredUsers} />
      )}
    </div>
  );
}
```

### Pattern 4: Delete with Confirmation

```javascript
import { ConfirmDialog } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

function UserRow({ user }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    // Delete logic
    setShowConfirm(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowConfirm(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={handleDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${user.username}?`}
      />
    </>
  );
}
```

---

## 🧪 Testing Checklist

### Layout Components

**ProtectedRoute**:
- [ ] Redirects to login when not authenticated
- [ ] Shows loading spinner initially
- [ ] Allows access with correct role
- [ ] Redirects to dashboard with wrong role
- [ ] Admin can access all routes

**Sidebar**:
- [ ] Shows correct menu items based on role
- [ ] Highlights active route
- [ ] Collapses and expands correctly
- [ ] Shows user info at bottom
- [ ] Navigation links work

**Header**:
- [ ] Displays page title correctly
- [ ] User menu opens on click
- [ ] Logout functionality works
- [ ] Shows toast on logout

**MainLayout**:
- [ ] Renders sidebar and header
- [ ] Content area is scrollable
- [ ] Layout is responsive

### Common Components

**StatsCard**:
- [ ] Displays title and value
- [ ] Shows icon correctly
- [ ] Renders trend with correct color
- [ ] Hover effect works

**SearchBar**:
- [ ] Input updates on change
- [ ] Search icon is visible
- [ ] Placeholder shows correctly

**FilterDropdown**:
- [ ] Options render correctly
- [ ] Selection changes value
- [ ] Label displays if provided

**EmptyState**:
- [ ] Shows title and message
- [ ] Icon renders correctly
- [ ] Action button calls handler

**ConfirmDialog**:
- [ ] Opens and closes correctly
- [ ] Confirm button calls handler
- [ ] Cancel button closes dialog
- [ ] Destructive styling applies

**PageHeader**:
- [ ] Title displays correctly
- [ ] Description shows if provided
- [ ] Action renders in correct position

---

## ✅ Phase 3 Complete

**Files Created**: 12 files (5 layout + 6 common + 1 index each)

**Lines of Code**: ~700 lines of production-ready React components

**Key Features**:
- ✅ Protected route wrapper with role-based access
- ✅ Collapsible sidebar with role-based menu
- ✅ Header with user menu and logout
- ✅ Main layout combining sidebar and header
- ✅ Statistics card component
- ✅ Search bar with icon
- ✅ Filter dropdown with label
- ✅ Empty state placeholder
- ✅ Confirmation dialog for destructive actions
- ✅ Page header with action support

**Components Ready to Use**:
- All components have proper TypeScript-ready prop types
- All interactive elements have data-testid attributes
- All components use Shadcn UI as base
- All components follow design system
- All components are responsive

**Next Phase**: Feature-Specific Components
- Login form
- Dashboard components
- User management components
- Configuration components

The layout and common components are production-ready! 🚀
