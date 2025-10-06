# Admin Panel - Quick Start Guide

## 🚀 Getting Started

The Admin Panel application is now fully functional and ready to use!

### Access the Application

**Frontend URL**: Check your deployment URL or `http://localhost:3000`

### Demo Credentials

| Username | Password | Role | Description |
|----------|----------|------|-------------|
| admin | admin123 | Admin | Full access to all features |
| user | user123 | User | Limited access (Dashboard only) |
| john_doe | john123 | User | Test user account |
| jane_smith | jane123 | User | Test user (inactive) |
| mike_admin | mike123 | Admin | Additional admin account |

---

## 📋 Available Features

### For All Users (User & Admin)

**Dashboard** (`/dashboard`)
- View account information
- See system statistics
- Personal welcome message

### For Admins Only

**User Management** (`/users`)
- View all users in a table
- Add new users
- Edit existing users
- Delete users
- Reset user passwords
- Search by username/email
- Filter by role (Admin/User)
- Filter by status (Active/Inactive)
- View user statistics

**Configuration** (`/config`)
- **Email Tab**: SMTP server settings
- **Notifications Tab**: Email, SMS, in-app preferences
- **Alerts Tab**: Alert thresholds and types
- **LLM Tab**: Model selection and parameters

**Admin Panel** (`/admin`)
- System overview
- Quick actions
- Recent user activity
- System status

---

## 🎯 Common Tasks

### Login
1. Navigate to the app
2. You'll be redirected to `/login`
3. Enter username and password
4. Click "Sign In"
5. You'll be redirected to Dashboard

### Add a New User (Admin)
1. Go to User Management (`/users`)
2. Click "Add User" button
3. Fill in the form:
   - Username (required)
   - Email (required)
   - Password (required)
   - Role (User or Admin)
   - Status (Active or Inactive)
4. Click "Create User"
5. Toast notification confirms success

### Edit a User (Admin)
1. Go to User Management
2. Find the user in the table
3. Click the edit icon (pencil)
4. Modify the information
5. Password is optional (leave empty to keep current)
6. Click "Update User"

### Delete a User (Admin)
1. Go to User Management
2. Find the user in the table
3. Click the delete icon (trash)
4. Confirm deletion in the dialog
5. User is removed

### Reset User Password (Admin)
1. Go to User Management
2. Find the user in the table
3. Click the key icon
4. Enter new password
5. Click "Reset Password"

### Update Configuration (Admin)
1. Go to Configuration (`/config`)
2. Switch between tabs (Email, Notifications, Alerts, LLM)
3. Make your changes
4. Notice "Save Changes" button becomes enabled
5. Click "Save Changes"
6. Configuration is saved to localStorage

### Logout
1. Click your avatar in the top-right corner
2. Click "Logout" in the dropdown
3. You'll be redirected to login page

---

## 🗺️ Navigation

### Sidebar Menu

**For Users**:
- Dashboard

**For Admins**:
- Dashboard
- User Management
- Configuration  
- Admin Panel

### Active Route Highlighting
The current page is highlighted with an emerald border and background in the sidebar.

### Collapsible Sidebar
Click the toggle button (X or Menu icon) in the sidebar to collapse it to icon-only mode.

---

## 🔍 Search and Filter (User Management)

### Search
- Type in the search bar
- Filters by username or email
- Real-time search (instant results)

### Filter by Role
- Select "All Roles", "Admin", or "User"
- Combines with search and status filter

### Filter by Status
- Select "All Status", "Active", or "Inactive"
- Combines with search and role filter

**All filters work together** - you can search for "john", filter by "User" role, and "Active" status simultaneously.

---

## 💾 Data Persistence

All data is stored in **browser localStorage**:
- Users array
- Configuration object
- Session/authentication

**This means**:
- ✅ Data persists across page refreshes
- ✅ Changes are immediately saved
- ✅ No backend/database required
- ⚠️ Data is browser-specific (not shared across devices)
- ⚠️ Clearing browser data will reset everything

---

## 🎨 UI Features

### Toast Notifications
Success and error messages appear in the bottom-right corner:
- Green toast = Success
- Red toast = Error
- Automatically disappear after a few seconds

### Loading States
- Login button shows "Signing in..." while processing
- Form buttons show "Saving..." during submission
- Tables show loading indicator while fetching data

### Empty States
- Friendly messages when no data exists
- Suggestions for what to do next
- Icon illustrations

### Confirmation Dialogs
- Appear before destructive actions (like delete)
- Require explicit confirmation
- Can be cancelled

### Form Validation
- Required fields are marked
- Email format validation
- Password length validation
- Unique username/email checks

---

## 📱 Responsive Design

The application works on:
- ✅ Desktop (optimal experience)
- ✅ Tablet (responsive grid)
- ✅ Mobile (stacked layout)

### Responsive Features:
- Grid layouts adjust from 4 columns → 2 columns → 1 column
- Sidebar can collapse to save space
- Tables scroll horizontally on small screens
- Touch-friendly tap targets

---

## 🐛 Troubleshooting

### Can't Login
- Check username and password (case-sensitive)
- Try demo credentials: admin/admin123 or user/user123
- Check browser console for errors

### Data Not Persisting
- Check if localStorage is enabled in browser
- Check browser privacy settings
- Try clearing localStorage and refreshing

### Routes Not Working
- Ensure you're using the correct URL
- Check if services are running: `sudo supervisorctl status`
- Restart frontend: `sudo supervisorctl restart frontend`

### Configuration Not Saving
- Click "Save Changes" button after making changes
- Check for error toast notification
- Verify localStorage is not full

### User Not Appearing After Add
- Check for error toast
- Verify username/email are unique
- Refresh the page

---

## 🔐 Security Notes

**This is a demo/development application with mock data:**

- ⚠️ Passwords are stored in plain text (not hashed)
- ⚠️ No real authentication backend
- ⚠️ Data is stored in browser localStorage
- ⚠️ Session doesn't expire on inactivity
- ⚠️ No rate limiting or brute force protection

**For production use, you would need**:
- Real database (MongoDB, PostgreSQL, etc.)
- Backend API (FastAPI, Express, etc.)
- Password hashing (bcrypt, argon2)
- JWT tokens or session management
- HTTPS/SSL
- Input sanitization
- CSRF protection

---

## 📞 Support

**Built With**:
- React 19
- React Router v7
- Tailwind CSS
- Shadcn UI
- Lucide React Icons
- Sonner (Toast notifications)

**Architecture**:
- Phase 1: Foundation (Utils, Constants)
- Phase 2: Context & Hooks (State Management)
- Phase 3: Layout & Common Components
- Phase 4: Feature Components
- Phase 5: Pages & Integration

**Documentation**:
- `PHASE1_FOUNDATION.md` - Utils and constants
- `PHASE2_CONTEXT_HOOKS.md` - Hooks and context
- `PHASE3_LAYOUT_COMPONENTS.md` - Layout components
- `PHASE4_5_COMPLETE.md` - Feature components and pages
- `HOOKS_QUICK_REFERENCE.md` - Hook usage
- `COMPONENTS_QUICK_REFERENCE.md` - Component usage

---

## 🎉 Enjoy Your Admin Panel!

You now have a fully functional admin panel with:
- ✨ Professional UI/UX
- 🔐 Authentication & Authorization
- 👥 User Management (CRUD)
- ⚙️ Configuration Management
- 📊 Statistics & Dashboards
- 🎨 Modern Design System
- 📱 Responsive Layout
- 🔔 Toast Notifications
- ✅ Form Validation
- 🛡️ Role-Based Access Control

**Start exploring by logging in with admin/admin123!** 🚀
