/**
 * Admin Credentials & Configuration
 * This file stores default admin account details for reference
 * Passwords are hashed in the database and never exposed in the application
 */

export const ADMIN_CREDENTIALS = {
  email: "aryanantal18@gmail.com",
  password: "Aryan8864#", // Only for initial seed - stored hashed in DB
  name: "Aryan Antal",
  role: "admin",
};

export const ADMIN_CONFIG = {
  // Default admin email - use this to verify admin account exists
  primaryAdminEmail: "aryanantal18@gmail.com",
  // Default role for admin
  adminRole: "admin",
  // Token expiration time in hours
  tokenExpiration: 24,
  // Password hashing salt rounds
  saltRounds: 10,
  // JWT algorithm
  jwtAlgorithm: "HS256",
};

/**
 * IMPORTANT SECURITY NOTES:
 * 
 * 1. This file contains reference credentials for development/testing only
 * 2. Passwords are NEVER stored in plaintext - they are hashed with bcryptjs
 * 3. The password field above is only used during the initial seed via: npm run seed
 * 4. After first login, change the password through the admin dashboard
 * 5. Never commit actual credentials in environment variables to version control
 * 6. Always use .env files with proper environment variable protection
 * 
 * Database Storage:
 * - User passwords are hashed using bcryptjs with 10 salt rounds
 * - The hash is what gets stored in MongoDB
 * - Passwords are compared during login using bcryptjs.compare()
 * - User model's toJSON() method excludes password field from API responses
 */

export const ROLE_PERMISSIONS = {
  admin: {
    canCreateUsers: true,
    canDeleteUsers: true,
    canEditAllUsers: true,
    canViewAllUsers: true,
    canDeleteContacts: true,
    canEditProjects: true,
    canDeleteProjects: true,
    canAccessDashboard: true,
  },
  user: {
    canCreateUsers: false,
    canDeleteUsers: false,
    canEditAllUsers: false,
    canViewAllUsers: false,
    canDeleteContacts: false,
    canEditProjects: false,
    canDeleteProjects: false,
    canAccessDashboard: false,
    canEditOwnProfile: true,
  },
};
