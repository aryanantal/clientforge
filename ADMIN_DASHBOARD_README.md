# Admin Dashboard & User Management System

This document describes the admin dashboard and user management functionality added to the ClientForge application.

## Overview

The system includes:
- **Admin Authentication**: Secure login with email and hashed passwords
- **User Management**: Create, edit, and delete users (admin only)
- **Role-Based Access**: Admin and regular user roles
- **Admin Dashboard**: View statistics and manage all data
- **Contact Management**: View and manage contact submissions
- **Project Management**: View and manage projects

## Features

### 1. **Login System**
- Email-based authentication
- Password hashing with bcryptjs
- JWT token-based session management
- 24-hour token expiration
- Error messages for invalid credentials

**Route**: `/login`

### 2. **Admin Dashboard**
- Dashboard statistics (total users, contacts, projects)
- Quick access navigation to all management pages
- User welcome message with profile info

**Route**: `/admin`

### 3. **User Management**
- View all users in a table format
- Create new users (admin only)
- Edit user information
- Delete users (admin only)
- Role assignment (admin or user)
- User status tracking (active/inactive)

**Route**: `/admin/users`

### 4. **Contact Management**
- View all contact submissions in a table
- Display contact information (name, email, company, message)
- Delete contacts
- View submission timestamps

**Route**: `/admin/contacts`

### 5. **Project Management**
- View all projects
- Edit project information
- Delete projects
- View tech stack for each project

**Route**: `/admin/projects`

## Backend Setup

### Installation

1. **Navigate to backend directory:**
```bash
cd apps/backend
```

2. **Install dependencies:**
```bash
npm install
```

This installs:
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT token management
- `express`: Backend framework
- `mongoose`: MongoDB connection
- `cors`: Cross-origin requests
- `dotenv`: Environment variables
- `nodemailer`: Email notifications

### Environment Configuration

1. **Copy the example environment file:**
```bash
cp .env.example .env
```

2. **Update `.env` with your configuration:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/clientforge
JWT_SECRET=your-super-secret-key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Create Default Admin User

Run the seed script to create a default admin user:

```bash
npm run seed
```

**Default Credentials:**
- Email: `aryanantal18@gmail.com`
- Password: `Aryan8864#`

⚠️ **Important**: Change the default password after first login!

### Start the Backend Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Frontend Setup

### API Integration

The frontend uses the following API endpoints:

**Authentication:**
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/users` - Get all users (requires auth)
- `POST /api/auth/users` - Create new user (admin only)
- `PUT /api/auth/users/:userId` - Update user
- `DELETE /api/auth/users/:userId` - Delete user (admin only)

**Contacts:**
- `POST /api/contact` - Submit contact form
- `GET /api/contact/all` - Get all contacts
- `DELETE /api/contact/:id` - Delete contact

**Projects:**
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Environment Variables

Create or update `.env.local` in `apps/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## User Workflow

### As an Admin:

1. **Login**
   - Go to `/login`
   - Enter email: `admin@example.com`
   - Enter password: `admin123`
   - Dashboard loads with admin navigation

2. **Manage Users**
   - Navigate to "Users" in sidebar
   - Click "Add User" to create new users
   - Set role as "Admin" or "User"
   - Edit or delete users from the table

3. **View Data**
   - Go to "Contacts" to view form submissions
   - Go to "Projects" to manage portfolio projects
   - View statistics on main dashboard

### As a Regular User:

1. **Login**
   - Use provided credentials
   - Can only view and edit their own profile
   - Cannot access user management
   - Cannot create or delete other users

## Form Structure & Styling

The admin forms follow the same structure as the contact form:

- **Input Fields**: 
  - Uppercase labels with letter-spacing
  - Bold font styling
  - Border-2 with foreground color
  - Primary color focus state
  - White background

- **Buttons**:
  - Bold uppercase text
  - Hover animations
  - Primary color for actions
  - Full width buttons

- **Toast Notifications**:
  - Success (green) and error (red) states
  - Auto-dismiss after 3 seconds
  - Smooth animations

## Database Schema

### User Model
```javascript
{
  email: String (unique, lowercase),
  password: String (hashed),
  name: String,
  role: "admin" | "user",
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact Schema (already exists)
```javascript
{
  name: String,
  email: String,
  company: String (optional),
  message: String,
  timestamps: true
}
```

### Project Schema (already exists)
```javascript
{
  title: String,
  description: String,
  tech: [String],
  createdAt: Date
}
```

## Security Features

1. **Password Hashing**: bcryptjs with salt rounds 10
2. **JWT Tokens**: Signed tokens with 24-hour expiration
3. **Authentication Middleware**: Protects admin routes
4. **Authorization**: Role-based access control
5. **Email Validation**: Checks if email exists before login
6. **Error Handling**: Generic error messages to prevent info leakage

## Troubleshooting

### "No user exist" on login
- Make sure the admin seed script was run
- Check MongoDB connection
- Verify email is lowercase in database

### "Invalid token" error
- Token may have expired (24 hours)
- Clear localStorage and login again
- Check JWT_SECRET in .env matches

### Dependencies not installing
- Delete `node_modules` folder
- Run `npm install` again
- Check Node.js version (v16+ recommended)

### MongoDB connection error
- Ensure MongoDB is running
- Check MONGO_URI in .env
- Verify database name is correct

## File Structure

```
backend/
├── models/
│   ├── User.js (NEW)
│   ├── Project.js
│   └── ...
├── modules/
│   ├── auth/ (NEW)
│   │   ├── auth.module.js
│   │   ├── auth.routes.js
│   │   └── controller/
│   │       └── auth.controller.js
│   ├── contact/
│   │   ├── controller/
│   │   └── ...
│   └── ...
├── middleware/
│   └── auth.js (NEW)
├── seeds/ (NEW)
│   └── createAdmin.js
└── server.js (UPDATED)

frontend/
├── app/
│   ├── login/ (NEW)
│   │   └── page.tsx
│   ├── admin/ (NEW)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   ├── contacts/
│   │   │   └── page.tsx
│   │   └── projects/
│   │       └── page.tsx
│   └── components/
│       └── AdminNav.tsx (NEW)
└── ...
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Set up environment variables
3. ✅ Run database seed for admin user
4. ✅ Start backend server
5. ✅ Start frontend development server
6. ✅ Login with admin credentials
7. ✅ Create additional users as needed
8. ✅ Customize admin password
9. ✅ Configure email notifications
10. ✅ Deploy to production

---

For questions or issues, refer to the main application README or contact support.
