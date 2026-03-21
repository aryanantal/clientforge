# System Architecture & Visual Overview

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENTFORGE ADMIN SYSTEM                      │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (Next.js)                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌─────────────┐     ┌──────────────┐     ┌────────────────────┐    │
│  │  Login Page │────▶│  /api/auth   │────▶│   Store JWT Token  │    │
│  │  /login     │     │   /login     │     │  in localStorage   │    │
│  └─────────────┘     └──────────────┘     └────────────────────┘    │
│                             ▲                                         │
│                             │                                         │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │                   ADMIN DASHBOARD (/admin)                    │   │
│  ├───────────────────────────────────────────────────────────────┤   │
│  │                                                               │   │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │   │
│  │  │    Users     │    │   Contacts   │    │  Projects    │   │   │
│  │  │ Management   │    │ Management   │    │ Management   │   │   │
│  │  │  /admin/     │    │  /admin/     │    │  /admin/     │   │   │
│  │  │   users      │    │  contacts    │    │  projects    │   │   │
│  │  └──────────────┘    └──────────────┘    └──────────────┘   │   │
│  │                                                               │   │
│  │  ┌─────────────────────────────────────────────────────┐    │   │
│  │  │           AdminNav Sidebar                          │    │   │
│  │  │  • User Info • Navigation • Logout                 │    │   │
│  │  └─────────────────────────────────────────────────────┘    │   │
│  │                                                               │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
                                 ▲
                     API Requests │ (JWT Bearer Token)
                                 │
┌──────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Express.js)                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │              Authentication Module (/api/auth)              │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │                                                              │    │
│  │  Routes:                                                    │    │
│  │  • POST /login        → login()                            │    │
│  │  • POST /register     → register()                         │    │
│  │  • GET /users         → getAllUsers() [Auth + Admin]       │    │
│  │  • POST /users        → createUser() [Admin Only]          │    │
│  │  • PUT /users/:id     → updateUser() [Authenticated]       │    │
│  │  • DELETE /users/:id  → deleteUser() [Admin Only]          │    │
│  │                                                              │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │           Contact Module (/api/contact) - Enhanced           │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │                                                              │    │
│  │  Routes:                                                    │    │
│  │  • POST /            → submitContact() [Public]            │    │
│  │  • GET /all          → getAllContacts() [All Contacts]     │    │
│  │  • DELETE /:id       → deleteContact() [Admin]             │    │
│  │                                                              │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │            Project Module (/api/projects)                   │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │                                                              │    │
│  │  Routes: (Existing)                                         │    │
│  │  • GET /     → Get all projects                            │    │
│  │  • POST /    → Create project                             │    │
│  │  • PUT /:id  → Update project                             │    │
│  │  • DELETE /: → Delete project                             │    │
│  │                                                              │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │               Middleware & Security                          │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │                                                              │    │
│  │  • verifyToken()    → JWT validation & parsing             │    │
│  │  • requireAdmin()   → Admin role check                     │    │
│  │  • requireAuth()    → Authentication check                 │    │
│  │  • Password hashing → bcryptjs with 10 salt rounds         │    │
│  │                                                              │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  Seed Script & Setup                                         │    │
│  ├──────────────────────────────────────────────────────────────┤    │
│  │                                                              │    │
│  │  • npm run seed → Creates default admin user              │    │
│  │    Email: admin@example.com                               │    │
│  │    Password: admin123 (hashed)                            │    │
│  │                                                              │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
                                 ▲
                        Database Query │
                                 │
┌──────────────────────────────────────────────────────────────────────┐
│                     DATABASE (MongoDB)                                │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  Collections:                                                         │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────┐  │
│  │   Users            │  │  Contacts          │  │  Projects    │  │
│  ├────────────────────┤  ├────────────────────┤  ├──────────────┤  │
│  │ • _id              │  │ • _id              │  │ • _id        │  │
│  │ • email (unique)   │  │ • name             │  │ • title      │  │
│  │ • password (hashed)│  │ • email            │  │ • description│  │
│  │ • name             │  │ • company          │  │ • tech       │  │
│  │ • role (enum)      │  │ • message          │  │ • createdAt  │  │
│  │ • isActive         │  │ • createdAt        │  │              │  │
│  │ • createdAt        │  │ • updatedAt        │  │              │  │
│  │ • updatedAt        │  │                    │  │              │  │
│  └────────────────────┘  └────────────────────┘  └──────────────┘  │
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌─────────────────┐
│   User Login    │
│   /login page   │
└────────┬────────┘
         │
         │ Enter email & password
         │
         ▼
┌──────────────────────────┐
│  Frontend sends:          │
│  POST /api/auth/login    │
│  {                        │
│    email,                │
│    password              │
│  }                        │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Backend Authentication:          │
│  1. Find user by email           │
│  2. Compare password hash        │
│  3. Verify user is active        │
│  4. Generate JWT token           │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Response to Frontend:    │
│  {                        │
│    token,                │
│    user: {               │
│      _id,                │
│      email,              │
│      name,               │
│      role                │
│    }                     │
│  }                        │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Frontend saves to       │
│  localStorage:           │
│  • token                 │
│  • user (JSON)           │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Redirect to /admin      │
│  (Protected route)       │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Protected Routes:       │
│  • AdminNav loads        │
│  • User info displayed   │
│  • Navigation available  │
│  • Token used for APIs   │
└──────────────────────────┘
```

## 👥 Authorization Levels

```
┌─────────────┐
│   Routes    │
└──────┬──────┘
       │
       ├─────────────────────────────────────────┐
       │                                         │
       ▼                                         ▼
    ┌──────────────┐                  ┌──────────────────────┐
    │ Public Routes│                  │ Protected Routes      │
    ├──────────────┤                  ├──────────────────────┤
    │ POST /login  │──┐               │ Require JWT Token    │
    │ POST /reg    │  │               │                      │
    │ POST /contact│  │               ├─────────────────────┐│
    │ GET /projects│  │               │                     ││
    └──────────────┘  │               │ GET /api/auth/users ││
                      │               │ PUT /api/auth/users ││
                      │               │ DELETE /api/auth/users
                      │               │ GET /api/contact/all│
                      │               │ DELETE /api/contact ││
                      │               │                     ││
                      │               └──────┬──────────────┘│
                      │                      │               │
                      │                      ▼               │
                      │              ┌───────────────────┐  │
                      │              │  Admin Only       │  │
                      │              ├───────────────────┤  │
                      │              │ POST /users       │  │
                      │              │ DELETE /users     │  │
                      │              │ (Create/Delete    │  │
                      │              │  User Accounts)   │  │
                      │              └───────────────────┘  │
                      │                                     │
                      └──────────────────────────────────────┘
```

## 🔄 User Management Workflow

```
┌──────────────┐
│  Admin User  │
└──────┬───────┘
       │
       ▼
1. Navigate to /admin/users
       │
       ▼
2. View Users Table
   ├─ Name, Email, Role, Status, Date
   ├─ Edit Button
   └─ Delete Button
       │
       ├─── Edit User ────┐
       │                 │
       │                 ▼
       │            Modal Opens
       │            ├─ Name field
       │            ├─ Email (disabled)
       │            ├─ Password (optional)
       │            └─ Role selector
       │                 │
       │                 ▼
       │            PUT /api/auth/users/id
       │                 │
       │                 ▼
       │            Update Success
       │                 │
       ├─── Add User ─────┤
       │                 │
       │                 ▼
       │            Modal Opens
       │            ├─ Name field
       │            ├─ Email field
       │            ├─ Password field
       │            └─ Role selector
       │                 │
       │                 ▼
       │            POST /api/auth/users
       │                 │
       │                 ▼
       │            Create Success
       │                 │
       └─── Delete User ──┤
                         │
                         ▼
                    Confirm Dialog
                         │
                         ▼
                    DELETE /api/auth/users/id
                         │
                         ▼
                    Delete Success
                         │
                         ▼
                    Refresh Table
```

## 📊 Component Hierarchy

```
App
│
├── /login
│   └── LoginPage
│       ├── Form Inputs
│       ├── API Call
│       └── Toast Notifications
│
├── /admin
│   ├── Layout
│   │   ├── Auth Check
│   │   ├── AdminNav
│   │   │   ├── User Profile
│   │   │   ├── Navigation Links
│   │   │   ├── Logout Button
│   │   │   └── Mobile Menu
│   │   │
│   │   └── Main Content
│   │
│   ├── /admin Dashboard
│   │   ├── Header
│   │   ├── Stats Cards
│   │   │   ├── Users Count
│   │   │   ├── Contacts Count
│   │   │   └── Projects Count
│   │   └── Quick Actions
│   │
│   ├── /admin/users
│   │   ├── Header with Add Button
│   │   ├── Users Table
│   │   │   ├── Name, Email, Role, Status
│   │   │   └── Actions (Edit, Delete)
│   │   └── User Modal
│   │       ├── Form Fields
│   │       └── Submit/Cancel Buttons
│   │
│   ├── /admin/contacts
│   │   ├── Header
│   │   └── Contact Cards
│   │       ├── Name, Email, Company
│   │       ├── Message
│   │       └── Delete Button
│   │
│   └── /admin/projects
│       ├── Header with Add Button
│       └── Project Cards
│           ├── Title, Description
│           ├── Tech Stack
│           └── Actions (Edit, Delete)
│
└── Global Toast Notifications
```

## 🔒 Security Layers

```
REQUEST
  │
  ├─ Route: /api/auth/login
  │  └─ No Auth Required ✓
  │
  ├─ Route: /admin (Protected)
  │  ├─ localStorage token check
  │  ├─ Redirect to /login if missing
  │  └─ AdminLayout renders
  │
  ├─ Route: /api/auth/users (Protected)
  │  ├─ verifyToken() middleware
  │  │  ├─ Extract JWT from header
  │  │  ├─ Verify signature
  │  │  └─ Decode payload
  │  └─ Continue if valid
  │
  ├─ Route: /api/auth/users (Create) [Admin Only]
  │  ├─ verifyToken() checks
  │  ├─ requireAdmin() checks role
  │  │  ├─ Only if role === 'admin'
  │  │  └─ Return 403 if not
  │  └─ createUser() processes request
  │
  └─ Password Storage (Database)
     ├─ bcryptjs hashing
     ├─ 10 salt rounds
     ├─ Saved as hash, not plaintext
     └─ Never returned in API responses

RESPONSE
  │
  ├─ user.toJSON() called
  │  ├─ Removes password field
  │  └─ Returns clean object
  │
  └─ localStorage save
     ├─ Token stored securely
     ├─ User data stored (no password)
     └─ Available for subsequent requests
```

---

This architecture provides:
- ✅ Secure authentication with JWT
- ✅ Password security with bcryptjs
- ✅ Role-based authorization
- ✅ Protected admin routes
- ✅ Responsive UI with consistent styling
- ✅ Real-time data management
- ✅ Clean separation of concerns
