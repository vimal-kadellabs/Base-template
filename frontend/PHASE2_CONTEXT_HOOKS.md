# Phase 2: React Context & Custom Hooks - Implementation Complete ✅

## Overview
This document describes the React Context and Custom Hooks implementation that provides global state management and reusable stateful logic for the Admin Panel application.

## Project Structure

```
/app/frontend/src/
├── contexts/
│   ├── AuthContext.jsx  # Authentication context provider
│   └── index.js         # Centralized exports
└── hooks/
    ├── useAuth.js       # Hook to access auth context
    ├── useLocalStorage.js # Hook to sync state with localStorage
    ├── useUsers.js      # Hook for user CRUD operations
    ├── useConfig.js     # Hook for configuration management
    ├── use-toast.js     # Toast notifications (pre-existing)
    └── index.js         # Centralized exports
```

---

## 🔐 AuthContext

### File: `/contexts/AuthContext.jsx`

**Purpose**: Provides global authentication state and methods to entire application

**Provider**: `<AuthProvider>`

**Context Value**:

#### State Properties:
- `currentUser` (Object|null) - Current logged-in user object
- `isAuthenticated` (boolean) - Whether user is logged in
- `isAdmin` (boolean) - Whether current user is admin
- `loading` (boolean) - Loading state for async operations
- `session` (Object|null) - Current session object

#### Methods:
- `login(username, password)` - Login user
  - Returns: `{ success: boolean, user?: Object, error?: string }`
  
- `logout()` - Logout current user and clear session
  
- `refreshUser()` - Refresh user data from localStorage
  - Useful after profile updates
  
- `hasRole(requiredRole)` - Check if user has specific role
  - Returns: `boolean`

### Features:

1. **Auto-initialization on Mount**
   - Checks localStorage for existing session
   - Restores user state if valid session exists
   - Handles session expiration

2. **Automatic State Management**
   - Updates all auth-related state on login/logout
   - Syncs with localStorage automatically
   - Provides loading states for UI feedback

3. **Role-based Access Control**
   - Built-in admin check
   - Generic role checking method
   - Admins have access to all roles

### Usage Example:

```javascript
import { AuthProvider } from '@/contexts/AuthContext';

// Wrap your app with AuthProvider
function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}
```

---

## 🪝 Custom Hooks

### 1. useAuth Hook

**File**: `/hooks/useAuth.js`

**Purpose**: Access authentication context in any component

**Returns**: All AuthContext values and methods

**Usage**:
```javascript
import { useAuth } from '@/hooks/useAuth';

function SomeComponent() {
  const { currentUser, isAuthenticated, isAdmin, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  return (
    <div>
      <h1>Welcome, {currentUser.username}!</h1>
      {isAdmin && <AdminPanel />}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Error Handling**: Throws error if used outside AuthProvider

---

### 2. useLocalStorage Hook

**File**: `/hooks/useLocalStorage.js`

**Purpose**: Sync React state with localStorage automatically

**Signature**: `useLocalStorage(key, initialValue)`

**Returns**: `[value, setValue, removeValue]`
- Similar to useState but persists to localStorage

**Features**:
1. Auto-save to localStorage on state change
2. Auto-load from localStorage on mount
3. Cross-tab synchronization (listens to storage events)
4. Error handling for localStorage operations
5. Supports function updates like useState

**Usage**:
```javascript
import { useLocalStorage } from '@/hooks/useLocalStorage';

function PreferencesComponent() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={removeTheme}>Reset</button>
    </div>
  );
}
```

**Benefits**:
- DRY principle - no need to manually call localStorage
- State persists across page refreshes
- Automatically handles JSON serialization
- Cross-tab state synchronization

---

### 3. useUsers Hook

**File**: `/hooks/useUsers.js`

**Purpose**: Complete user management with CRUD operations

**Returns Object**:

#### State:
- `users` (Array) - All users array
- `loading` (boolean) - Loading state
- `error` (string|null) - Error message if any

#### CRUD Operations:
- `addUser(userData)` - Add new user
  - Validates: username, email, password, uniqueness
  - Returns: `{ success, user?, error?, message? }`
  
- `updateUser(userId, updates)` - Update existing user
  - Validates: uniqueness if username/email changed
  - Returns: `{ success, user?, error?, message? }`
  
- `deleteUser(userId)` - Delete user
  - Returns: `{ success, error?, message? }`
  
- `resetPassword(userId, newPassword)` - Reset user password
  - Validates: password strength
  - Returns: `{ success, error? }`

#### Query Operations:
- `getUserById(userId)` - Get single user
  - Returns: User object or null
  
- `getFilteredUsers(filters)` - Get filtered users
  - Filters: `{ search, role, status, sortBy, order }`
  - Returns: Filtered array
  
- `getStats()` - Get user statistics
  - Returns: `{ total, active, inactive, admins, regularUsers, recentlyActive }`

#### Utility:
- `refresh()` - Reload users from localStorage

**Usage Example**:
```javascript
import { useUsers } from '@/hooks/useUsers';

function UserManagement() {
  const { 
    users, 
    loading, 
    error,
    addUser, 
    updateUser, 
    deleteUser,
    getFilteredUsers,
    getStats 
  } = useUsers();
  
  const stats = getStats();
  
  const handleAddUser = async () => {
    const result = addUser({
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123',
      role: 'user',
    });
    
    if (result.success) {
      console.log('User added:', result.user);
    } else {
      console.error(result.error);
    }
  };
  
  const filteredUsers = getFilteredUsers({
    search: 'john',
    role: 'user',
    status: 'active',
  });
  
  return (
    <div>
      <h2>Total Users: {stats.total}</h2>
      <button onClick={handleAddUser}>Add User</button>
      {/* Render users */}
    </div>
  );
}
```

**Features**:
- Automatic localStorage sync
- Built-in validation
- Comprehensive error handling
- Uniqueness checks for username/email
- Statistics calculation
- Flexible filtering and sorting

---

### 4. useConfig Hook

**File**: `/hooks/useConfig.js`

**Purpose**: Manage application configuration

**Returns Object**:

#### State:
- `config` (Object) - Complete configuration object
- `loading` (boolean) - Loading state
- `error` (string|null) - Error message if any

#### General Operations:
- `updateConfig(updates)` - Update any config section
  - Returns: `{ success, config?, error?, message? }`
  
- `resetConfig()` - Reset to default configuration
  - Returns: `{ success, config?, error?, message? }`
  
- `getConfigSection(section)` - Get specific config section
  - Returns: Section object or null

#### Specific Section Updates:
- `updateEmailConfig(emailConfig)` - Update email settings
- `updateNotificationSettings(notificationSettings)` - Update notifications
- `updateAlertSettings(alertSettings)` - Update alerts
- `updateLLMConfig(llmConfig)` - Update LLM settings

#### Utility:
- `refresh()` - Reload config from localStorage

**Configuration Structure**:
```javascript
{
  email: {
    smtpServer: string,
    smtpPort: number,
    senderEmail: string,
    senderName: string,
    emailTemplate: object,
    enableSSL: boolean,
  },
  notifications: {
    email: boolean,
    sms: boolean,
    in_app: boolean,
    digestFrequency: string,
    quietHoursStart: string,
    quietHoursEnd: string,
  },
  alerts: {
    enableAlerts: boolean,
    channels: array,
    thresholds: object,
    alertTypes: object,
  },
  llm: {
    selectedModel: string,
    temperature: number,
    maxTokens: number,
    enableLogging: boolean,
  },
}
```

**Usage Example**:
```javascript
import { useConfig } from '@/hooks/useConfig';

function ConfigurationPage() {
  const { 
    config, 
    loading,
    updateEmailConfig,
    updateLLMConfig,
    resetConfig,
  } = useConfig();
  
  const handleUpdateEmail = () => {
    const result = updateEmailConfig({
      smtpServer: 'smtp.newserver.com',
      smtpPort: 587,
    });
    
    if (result.success) {
      console.log('Email config updated');
    }
  };
  
  const handleUpdateLLM = () => {
    updateLLMConfig({
      selectedModel: 'gpt-4o-mini',
      temperature: 0.8,
    });
  };
  
  return (
    <div>
      <h2>Configuration</h2>
      <div>SMTP Server: {config.email.smtpServer}</div>
      <div>LLM Model: {config.llm.selectedModel}</div>
      <button onClick={handleUpdateEmail}>Update Email</button>
      <button onClick={handleUpdateLLM}>Update LLM</button>
      <button onClick={resetConfig}>Reset to Defaults</button>
    </div>
  );
}
```

**Features**:
- Automatic localStorage sync
- Section-specific update methods
- Merge strategy for partial updates
- Reset to defaults
- Comprehensive error handling

---

## 🔄 Data Flow Architecture

### Authentication Flow:
```
User Login
   ↓
useAuth.login(username, password)
   ↓
AuthContext validates credentials (utils/auth.js)
   ↓
Creates session in localStorage
   ↓
Updates AuthContext state
   ↓
All components receive updated auth state
```

### User Management Flow:
```
Component calls useUsers hook
   ↓
Hook loads users from localStorage on mount
   ↓
Component performs CRUD operation
   ↓
Hook validates and updates localStorage
   ↓
Hook updates local state
   ↓
Component re-renders with new data
```

### Configuration Flow:
```
Component calls useConfig hook
   ↓
Hook loads config from localStorage on mount
   ↓
Component updates config
   ↓
Hook merges updates with existing config
   ↓
Hook saves to localStorage
   ↓
Hook updates local state
   ↓
Component re-renders with new config
```

---

## 🎯 Integration Pattern

### Complete App Setup:

```javascript
// App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <YourRoutes />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

### In Components:

```javascript
import { useAuth } from '@/hooks/useAuth';
import { useUsers } from '@/hooks/useUsers';
import { useConfig } from '@/hooks/useConfig';

function Dashboard() {
  // Use multiple hooks together
  const { currentUser, isAdmin } = useAuth();
  const { getStats } = useUsers();
  const { config } = useConfig();
  
  const stats = getStats();
  
  return (
    <div>
      <h1>Welcome, {currentUser.username}!</h1>
      <p>Total Users: {stats.total}</p>
      <p>LLM Model: {config.llm.selectedModel}</p>
    </div>
  );
}
```

---

## ✅ Benefits of This Architecture

### 1. **Centralized State Management**
- Single source of truth for auth and data
- No prop drilling
- Easy to access from any component

### 2. **Automatic Persistence**
- All state automatically synced with localStorage
- Data survives page refreshes
- No manual localStorage calls in components

### 3. **Reusable Logic**
- CRUD operations defined once, used everywhere
- Consistent validation across app
- Easy to test and maintain

### 4. **Type Safety Ready**
- Clear return types
- Documented parameters
- Easy to add TypeScript types

### 5. **Error Handling**
- Built-in error handling in all operations
- Loading states for UI feedback
- Graceful error recovery

### 6. **Separation of Concerns**
- Components focus on UI
- Hooks handle business logic
- Utils handle low-level operations

---

## 🧪 Testing the Hooks

### Test in Browser Console:

```javascript
// Access React DevTools or add temporary logging

// Test useAuth
const { login, currentUser } = useAuth();
login('admin', 'admin123');

// Test useUsers
const { users, addUser, getStats } = useUsers();
const stats = getStats();
console.log('User stats:', stats);

// Test useConfig
const { config, updateLLMConfig } = useConfig();
updateLLMConfig({ selectedModel: 'gpt-4o-mini' });
console.log('Updated config:', config);
```

---

## 📝 Hook Dependencies

### useAuth
- Depends on: AuthContext, utils/auth.js
- Used by: All protected components

### useLocalStorage
- Depends on: utils/localStorage.js
- Used by: Any component needing persistent state

### useUsers
- Depends on: utils/localStorage.js, utils/dataHelpers.js, utils/validation.js
- Used by: User management components, dashboard

### useConfig
- Depends on: utils/localStorage.js, constants/mockData.js
- Used by: Configuration page, settings

---

## 🚀 Next Steps

**Phase 3**: Layout & Common Components
- ProtectedRoute wrapper component
- MainLayout with Sidebar and Header
- Reusable UI components (StatsCard, SearchBar, etc.)

**Phase 4**: Feature-Specific Components
- Auth components (LoginForm)
- Dashboard components (UserDashboard, AdminDashboard)
- User management components (UserTable, UserForm)
- Config components (EmailConfig, NotificationConfig, etc.)

**Phase 5**: Page Components
- Compose everything into pages
- Wire up routing
- Complete the application

---

## ✅ Phase 2 Complete

**Files Created**: 7 files (1 context + 4 custom hooks + 2 index files)

**Lines of Code**: ~800 lines of well-documented, production-ready code

**Key Features**:
- ✅ Global authentication state management
- ✅ Automatic localStorage synchronization
- ✅ Complete user CRUD operations
- ✅ Configuration management
- ✅ Comprehensive error handling
- ✅ Loading states for UI feedback
- ✅ Type-safe patterns
- ✅ Reusable across entire application

The context and hooks layer is complete and ready to be used in components!
