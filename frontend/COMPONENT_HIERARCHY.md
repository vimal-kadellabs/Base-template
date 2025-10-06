# Component Hierarchy & Structure

## Visual Component Tree

```
App
└─ AuthProvider (Context)
    └─ BrowserRouter
        └─ Routes
            ├─ Route: /login (Public)
            │   └─ LoginPage
            │
            ├─ Route: /dashboard (Protected)
            │   └─ ProtectedRoute
            │       └─ MainLayout (title="Dashboard")
            │           ├─ Sidebar (auto-included)
            │           │   ├─ Logo
            │           │   ├─ Navigation Menu
            │           │   │   ├─ Dashboard Link
            │           │   │   ├─ User Management Link (admin only)
            │           │   │   ├─ Configuration Link (admin only)
            │           │   │   └─ Admin Panel Link (admin only)
            │           │   └─ User Info
            │           │
            │           ├─ Header (auto-included)
            │           │   ├─ Page Title
            │           │   └─ User Menu Dropdown
            │           │       ├─ User Info
            │           │       ├─ Profile
            │           │       └─ Logout
            │           │
            │           └─ Main Content (scrollable)
            │               └─ DashboardPage
            │                   ├─ PageHeader
            │                   │   ├─ Title
            │                   │   ├─ Description
            │                   │   └─ Action Button
            │                   │
            │                   ├─ Stats Grid
            │                   │   ├─ StatsCard (Total Users)
            │                   │   ├─ StatsCard (Active Users)
            │                   │   └─ StatsCard (Inactive Users)
            │                   │
            │                   └─ Content Sections
            │
            ├─ Route: /users (Admin Only)
            │   └─ ProtectedRoute (requiredRole="admin")
            │       └─ MainLayout (title="User Management")
            │           └─ UsersPage
            │               ├─ PageHeader
            │               ├─ Stats Grid (StatsCards)
            │               ├─ Filters
            │               │   ├─ SearchBar
            │               │   └─ FilterDropdown
            │               │
            │               ├─ UserTable (or EmptyState)
            │               │
            │               └─ Modals
            │                   ├─ UserForm Dialog
            │                   └─ ConfirmDialog
            │
            ├─ Route: /config (Admin Only)
            │   └─ ProtectedRoute (requiredRole="admin")
            │       └─ MainLayout (title="Configuration")
            │           └─ ConfigPage
            │
            └─ Route: /admin (Admin Only)
                └─ ProtectedRoute (requiredRole="admin")
                    └─ MainLayout (title="Admin Panel")
                        └─ AdminPanelPage
```

---

## Component Dependency Graph

```
Layout Components Layer
┌─────────────────────────────────────────────┐
│  ProtectedRoute                             │
│    ↓ uses                                   │
│  useAuth() hook                             │
│    ↓ redirects to                           │
│  ROUTES.LOGIN                               │
└─────────────────────────────────────────────┘
         ↓ wraps
┌─────────────────────────────────────────────┐
│  MainLayout                                 │
│    ├─ Sidebar                               │
│    │    ↓ uses                              │
│    │    - useAuth() → currentUser, isAdmin  │
│    │    - useLocation() → active route     │
│    │    - ROUTES constants                  │
│    │                                         │
│    └─ Header                                │
│         ↓ uses                              │
│         - useAuth() → logout, currentUser   │
│         - useNavigate() → redirect          │
│         - toast() → notifications           │
└─────────────────────────────────────────────┘
         ↓ contains
┌─────────────────────────────────────────────┐
│  Page Content (Main Content Area)           │
└─────────────────────────────────────────────┘
```

---

## Common Components Usage Flow

```
Page Component
    ↓
┌───────────────────────────────────┐
│ PageHeader                        │
│  - Sets page title & description  │
│  - Provides action button area    │
└───────────────────────────────────┘
    ↓
┌───────────────────────────────────┐
│ StatsCard Grid                    │
│  - Displays key metrics           │
│  - Visual indicators with icons   │
│  - Trend information              │
└───────────────────────────────────┘
    ↓
┌───────────────────────────────────┐
│ Filters Section                   │
│  ├─ SearchBar                     │
│  │   - Filter by text search      │
│  │                                 │
│  └─ FilterDropdown(s)             │
│      - Filter by categories       │
└───────────────────────────────────┘
    ↓
┌───────────────────────────────────┐
│ Data Display                      │
│  ├─ Data exists?                  │
│  │   Yes → Table/List/Cards       │
│  │   No  → EmptyState             │
│  │                                 │
│  └─ Actions                       │
│      ├─ Edit/Delete buttons       │
│      └─ ConfirmDialog on delete   │
└───────────────────────────────────┘
```

---

## Composition Patterns

### Pattern 1: Basic Protected Page
```
ProtectedRoute
  └─ MainLayout
      └─ Page Content
          ├─ PageHeader
          ├─ Stats (optional)
          └─ Main Content
```

### Pattern 2: Admin Page with Filters
```
ProtectedRoute (requiredRole="admin")
  └─ MainLayout
      └─ Page Content
          ├─ PageHeader (with action)
          ├─ StatsCard Grid
          ├─ Filters (SearchBar + FilterDropdown)
          ├─ Data Display
          │   ├─ If empty → EmptyState
          │   └─ If data → Table/List
          └─ Modals
              ├─ Add/Edit Dialog
              └─ ConfirmDialog
```

### Pattern 3: Dashboard Page
```
ProtectedRoute
  └─ MainLayout
      └─ Dashboard Content
          ├─ PageHeader
          ├─ Stats Grid (Multiple StatsCards)
          ├─ Charts/Graphs
          ├─ Recent Activity
          └─ Quick Actions
```

---

## State Flow Through Components

### Authentication Flow
```
1. User lands on protected route
2. ProtectedRoute checks useAuth()
3. If not authenticated:
   - Show loading spinner
   - Redirect to /login
4. If authenticated:
   - Render MainLayout
   - Sidebar shows role-based menu
   - Header shows user info
   - Content renders
```

### Data Flow Example (User Management)
```
UsersPage Component
    ↓ calls
useUsers() hook
    ↓ provides
{ users, addUser, deleteUser, getStats, getFilteredUsers }
    ↓ used in
├─ StatsCards (display getStats())
├─ SearchBar (filter state)
├─ FilterDropdown (filter state)
├─ UserTable (display getFilteredUsers())
└─ Modals
    ├─ UserForm (calls addUser)
    └─ ConfirmDialog (calls deleteUser)
```

### Component Communication
```
Parent Component (Page)
    ↓ state & handlers
    ├─ PageHeader (receives action prop)
    ├─ SearchBar (receives value, onChange)
    ├─ FilterDropdown (receives value, onChange)
    ├─ DataTable (receives data, onEdit, onDelete)
    └─ ConfirmDialog (receives open, onConfirm)

All components communicate via props ↑↓
No global state except AuthContext
```

---

## Responsive Breakpoints

### Sidebar
- Desktop: Full width (w-64)
- Collapsed: Icon only (w-20)
- Mobile: Full width overlay (future enhancement)

### Layout Grid
- Mobile (default): 1 column
- Tablet (md:): 2 columns
- Desktop (lg:): 3-4 columns

### Header
- Mobile: Minimal (avatar + dropdown)
- Desktop: Full (avatar + name + role + dropdown)

---

## Component Lifecycle

### ProtectedRoute
```
Mount
  ↓
Check useAuth().loading
  ↓
If loading → Show spinner
If not authenticated → Redirect to login
If wrong role → Redirect to dashboard
If authorized → Render children
```

### MainLayout
```
Mount
  ↓
Render Sidebar
  ↓ (auto-initializes from localStorage)
Render Header
  ↓ (receives currentUser from context)
Render Main Content
  ↓ (scrollable area with children)
```

### StatsCard
```
Mount
  ↓
Receive props (title, value, icon, trend)
  ↓
Render with hover effect
  ↓
Update on prop changes
```

---

## Folder Structure Summary

```
src/
├── components/
│   ├── layout/           # Structural components
│   │   ├── ProtectedRoute.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── MainLayout.jsx
│   │   └── index.js
│   │
│   ├── common/           # Reusable components
│   │   ├── StatsCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterDropdown.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── PageHeader.jsx
│   │   └── index.js
│   │
│   └── ui/               # Shadcn base components
│       └── (button, card, input, etc.)
│
├── hooks/                # Custom hooks (Phase 2)
│   ├── useAuth.js
│   ├── useUsers.js
│   ├── useConfig.js
│   └── useLocalStorage.js
│
├── contexts/             # React contexts (Phase 2)
│   └── AuthContext.jsx
│
├── utils/                # Utilities (Phase 1)
│   ├── localStorage.js
│   ├── auth.js
│   ├── validation.js
│   ├── dataHelpers.js
│   └── dateHelpers.js
│
└── constants/            # Constants (Phase 1)
    ├── routes.js
    ├── config.js
    └── mockData.js
```

---

## Integration Points

### Phase 1 (Foundation) → Phase 3 (Components)
- `constants/routes.js` → Sidebar navigation
- `utils/*` → Used indirectly via hooks

### Phase 2 (Hooks) → Phase 3 (Components)
- `useAuth()` → ProtectedRoute, Sidebar, Header
- `useUsers()` → Will be used in Pages (Phase 4)
- `useConfig()` → Will be used in Config Page (Phase 4)

### Phase 3 (Components) → Phase 4 (Feature Components)
- Layout components → Wrap all pages
- Common components → Used in all pages
- Design patterns → Followed in all new components

---

## Next Phase Preview

**Phase 4** will create:
- LoginPage using AuthContext
- DashboardPage using StatsCard, PageHeader
- UsersPage using SearchBar, FilterDropdown, EmptyState
- ConfigPage using tabs and forms
- AdminPanelPage using StatsCard grid

All will follow the composition patterns established in Phase 3! 🚀
