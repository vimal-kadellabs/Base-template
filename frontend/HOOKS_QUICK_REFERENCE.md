# Quick Reference Guide: Hooks & Context

## Import Statements

```javascript
// Authentication
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/contexts/AuthContext';

// User Management
import { useUsers } from '@/hooks/useUsers';

// Configuration
import { useConfig } from '@/hooks/useConfig';

// LocalStorage Sync
import { useLocalStorage } from '@/hooks/useLocalStorage';
```

---

## useAuth - Quick Reference

```javascript
const {
  // State
  currentUser,      // Current user object or null
  isAuthenticated,  // boolean
  isAdmin,         // boolean
  loading,         // boolean
  session,         // Session object or null
  
  // Methods
  login,           // (username, password) => { success, user?, error? }
  logout,          // () => void
  refreshUser,     // () => void
  hasRole,         // (role) => boolean
} = useAuth();

// Usage Examples:
if (!isAuthenticated) navigate('/login');
if (isAdmin) showAdminPanel();
if (hasRole('user')) showUserFeatures();
```

---

## useUsers - Quick Reference

```javascript
const {
  // State
  users,    // Array of all users
  loading,  // boolean
  error,    // string or null
  
  // CRUD
  addUser,         // (userData) => { success, user?, error? }
  updateUser,      // (userId, updates) => { success, user?, error? }
  deleteUser,      // (userId) => { success, error? }
  resetPassword,   // (userId, newPassword) => { success, error? }
  
  // Query
  getUserById,        // (userId) => user or null
  getFilteredUsers,   // (filters) => filtered array
  getStats,          // () => { total, active, inactive, admins, ... }
  
  // Utility
  refresh,  // () => void - reload from localStorage
} = useUsers();

// Add User Example:
const result = addUser({
  username: 'john',
  email: 'john@example.com',
  password: 'password123',
  role: 'user',
  status: 'active',
});

// Filter Users Example:
const filtered = getFilteredUsers({
  search: 'john',
  role: 'user',
  status: 'active',
  sortBy: 'username',
  order: 'asc',
});
```

---

## useConfig - Quick Reference

```javascript
const {
  // State
  config,   // Complete config object
  loading,  // boolean
  error,    // string or null
  
  // General
  updateConfig,        // (updates) => { success, config?, error? }
  resetConfig,         // () => { success, config?, error? }
  getConfigSection,    // (section) => section object or null
  
  // Specific Sections
  updateEmailConfig,           // (emailConfig) => result
  updateNotificationSettings,  // (settings) => result
  updateAlertSettings,        // (settings) => result
  updateLLMConfig,            // (llmConfig) => result
  
  // Utility
  refresh,  // () => void
} = useConfig();

// Update Email Example:
updateEmailConfig({
  smtpServer: 'smtp.gmail.com',
  smtpPort: 587,
});

// Update LLM Example:
updateLLMConfig({
  selectedModel: 'gpt-4o-mini',
  temperature: 0.8,
});

// Access Specific Section:
const emailConfig = getConfigSection('email');
```

---

## useLocalStorage - Quick Reference

```javascript
const [value, setValue, removeValue] = useLocalStorage('key', defaultValue);

// Just like useState, but persists to localStorage
setValue('new value');
setValue(prev => prev + 1);  // Function updates work too
removeValue();  // Remove from localStorage

// Examples:
const [theme, setTheme] = useLocalStorage('theme', 'light');
const [preferences, setPreferences] = useLocalStorage('prefs', {});
const [history, setHistory] = useLocalStorage('history', []);
```

---

## Common Patterns

### Protected Component:
```javascript
function ProtectedComponent() {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <AccessDenied />;
  }
  
  return <AdminContent />;
}
```

### User Management:
```javascript
function UserManagement() {
  const { users, addUser, deleteUser, getStats } = useUsers();
  const stats = getStats();
  
  const handleAdd = () => {
    const result = addUser({...});
    if (result.success) {
      toast.success('User added!');
    } else {
      toast.error(result.error);
    }
  };
  
  return <UserList users={users} stats={stats} />;
}
```

### Login Form:
```javascript
function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Configuration Page:
```javascript
function ConfigPage() {
  const { config, updateEmailConfig, updateLLMConfig } = useConfig();
  
  const handleSave = () => {
    const result = updateEmailConfig({
      smtpServer: formData.smtp,
    });
    
    if (result.success) {
      toast.success('Configuration saved!');
    }
  };
  
  return <ConfigForm config={config} onSave={handleSave} />;
}
```

---

## Error Handling Pattern

All hooks return results in this format:
```javascript
{
  success: boolean,
  data?: any,        // On success
  error?: string,    // On failure
  message?: string,  // Optional success message
}
```

Usage:
```javascript
const result = addUser({...});

if (result.success) {
  // Handle success
  toast.success(result.message);
  console.log(result.user);
} else {
  // Handle error
  toast.error(result.error);
  setError(result.error);
}
```

---

## Mock Credentials

For testing authentication:

| Username | Password | Role | Status |
|----------|----------|------|--------|
| admin | admin123 | admin | active |
| user | user123 | user | active |
| john_doe | john123 | user | active |
| jane_smith | jane123 | user | inactive |
| mike_admin | mike123 | admin | active |

---

## Tips

1. **Always wrap app with AuthProvider**
2. **Use hooks only inside functional components**
3. **Check loading state before rendering data**
4. **Handle errors gracefully with toast notifications**
5. **Use refresh() if data might be stale**
6. **All operations are synchronous (no async/await needed)**
7. **Data persists across page refreshes automatically**
