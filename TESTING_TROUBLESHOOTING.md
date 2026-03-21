# Testing Guide & Troubleshooting

## 🧪 Testing Checklist

### Backend Setup Testing

- [ ] **Node & npm installed**
  ```bash
  node --version  # Should be v16+
  npm --version
  ```

- [ ] **MongoDB running**
  ```bash
  # Windows: MongoDB should be running as service
  # Or start manually: mongod
  ```

- [ ] **Dependencies installed**
  ```bash
  cd apps/backend
  npm install
  npm list bcryptjs jsonwebtoken
  ```

- [ ] **Environment configured**
  ```bash
  cat .env  # Should have MONGO_URI and other vars
  ```

- [ ] **Default admin created**
  ```bash
  npm run seed
  # Should see: "Default admin user created successfully!"
  ```

- [ ] **Backend starts**
  ```bash
  npm run dev
  # Should see: "Server running on port 5000"
  #           "MongoDB Connected"
  ```

### Frontend Setup Testing

- [ ] **Node modules installed**
  ```bash
  cd apps/frontend
  npm list framer-motion lucide-react
  ```

- [ ] **Environment set**
  ```bash
  cat .env.local
  # Should have NEXT_PUBLIC_API_URL=http://localhost:5000
  ```

- [ ] **Frontend starts**
  ```bash
  npm run dev
  # Should see: "Local: http://localhost:3000"
  ```

---

## 🧑‍💻 API Testing Guide

### Test 1: Login with Default Admin

**Endpoint:** `POST http://localhost:5000/api/auth/login`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "aryanantal18@gmail.com",
    "password": "Aryan8864#"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "email": "admin@example.com",
    "name": "Admin User",
    "role": "admin",
    "isActive": true,
    "createdAt": "2026-03-21T..."
  }
}
```

### Test 2: Get All Users (Requires Token)

**Endpoint:** `GET http://localhost:5000/api/auth/users`

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "..."
    }
  ]
}
```

### Test 3: Create New User (Admin Only)

**Endpoint:** `POST http://localhost:5000/api/auth/users`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "Regular User",
    "role": "user"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "_id": "...",
    "email": "user@example.com",
    "name": "Regular User",
    "role": "user",
    "isActive": true
  }
}
```

### Test 4: Get All Contacts

**Endpoint:** `GET http://localhost:5000/api/contact/all`

**Request:**
```bash
curl -X GET http://localhost:5000/api/contact/all
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Acme Inc",
      "message": "...",
      "createdAt": "2026-03-21T...",
      "updatedAt": "2026-03-21T..."
    }
  ]
}
```

---

## 🎯 Frontend Testing

### Test 1: Login Page

1. Open `http://localhost:3000/login`
2. Enter: `aryanantal18@gmail.com` and `Aryan8864#`
3. Click "SIGN IN"
4. **Expected**: Redirect to `/admin` dashboard
5. **Check**: localStorage contains `token` and `user`

### Test 2: Admin Dashboard

1. After login, should see dashboard
2. **Check**: 
   - Header shows "ADMIN DASHBOARD"
   - Stats cards display (Users, Contacts, Projects)
   - Navigation sidebar visible
   - User info shows in sidebar

### Test 3: Users Management

1. Click "Users" in sidebar
2. Click "Add User" button
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Role: User
4. Click "Create"
5. **Expected**: Toast says "User created successfully!"
6. **Check**: New user appears in table

### Test 4: Edit User

1. In Users table, click Edit button for a user
2. Change name or password
3. Click "Update"
4. **Expected**: Toast says "User updated successfully!"
5. **Check**: Table refreshes with changes

### Test 5: Delete User

1. In Users table, click Delete button
2. Confirm deletion
3. **Expected**: Toast says "User deleted successfully!"
4. **Check**: User removed from table

### Test 6: Logout

1. In sidebar, click "LOGOUT"
2. **Expected**: Redirect to `/login`
3. **Check**: localStorage cleared

### Test 7: Protected Routes

1. Clear localStorage manually
2. Try accessing `http://localhost:3000/admin`
3. **Expected**: Redirect to `/login`

---

## 🐛 Troubleshooting Common Issues

### Issue 1: "No user exist" on Login

**Symptoms:**
```
Login attempt with aryanantal18@gmail.com shows "No user exist"
```

**Solutions:**
1. Check MongoDB is running
   ```bash
   # Windows: Check Services
   # Or: mongo (should connect)
   ```

2. Verify admin was created
   ```bash
   npm run seed
   ```

3. Check database directly
   ```javascript
   // In mongosh/mongo shell
   use clientforge
   db.users.findOne({email: "aryanantal18@gmail.com"})
   ```

4. Check .env MONGO_URI
   ```bash
   cat .env | grep MONGO_URI
   ```

### Issue 2: "Invalid token" Error

**Symptoms:**
```
API calls return 401 "Invalid token"
```

**Solutions:**
1. **Token expired**: Login again (tokens last 24 hours)
2. **Wrong JWT_SECRET**: Check .env JWT_SECRET matches backend
3. **Token malformed**: Clear localStorage, login again
4. **Missing Authorization header**: Check API call includes `Authorization: Bearer TOKEN`

### Issue 3: CORS Errors

**Symptoms:**
```
Error: "Access to XMLHttpRequest blocked by CORS"
```

**Solutions:**
1. Check backend server is running on 5000
   ```bash
   lsof -i :5000  # or netstat on Windows
   ```

2. Check .env `NEXT_PUBLIC_API_URL` is correct
   ```bash
   echo $NEXT_PUBLIC_API_URL  # Should be http://localhost:5000
   ```

3. Verify CORS is enabled in server.js
   ```javascript
   app.use(cors());  // Should be present
   ```

### Issue 4: Dependencies Installation Fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve dependency peer
```

**Solutions:**
1. Try with --legacy-peer-deps
   ```bash
   npm install --legacy-peer-deps
   ```

2. Clear npm cache
   ```bash
   npm cache clean --force
   npm install
   ```

3. Check Node version (v16+ required)
   ```bash
   node --version
   ```

### Issue 5: MongoDB Connection Error

**Symptoms:**
```
MongooseError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. **Check MongoDB is running**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo service mongod start
   ```

2. **Verify connection string**
   ```bash
   cat .env | grep MONGO_URI
   # Should be: mongodb://localhost:27017/clientforge
   ```

3. **Test connection**
   ```bash
   mongosh "mongodb://localhost:27017/clientforge"
   ```

### Issue 6: Password Hashing Not Working

**Symptoms:**
```
User password stored as plaintext in database
```

**Solutions:**
1. Check bcryptjs is installed
   ```bash
   npm list bcryptjs
   ```

2. Verify pre-save hook in User model
   ```javascript
   // Should be present in User.js
   userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) return next();
     // hash password...
   }
   ```

3. Recreate admin user
   ```bash
   npm run seed
   ```

### Issue 7: User Can't Access Dashboard

**Symptoms:**
```
Logged in but dashboard shows loading infinitely
```

**Solutions:**
1. Check token in localStorage
   ```javascript
   // In browser console
   console.log(localStorage.getItem("token"))
   console.log(localStorage.getItem("user"))
   ```

2. Check backend is returning user data
   ```bash
   # Use curl to test API
   curl -H "Authorization: Bearer TOKEN" \
     http://localhost:5000/api/auth/users
   ```

3. Clear localStorage and login again
   ```javascript
   // In browser console
   localStorage.clear()
   // Then navigate to /login
   ```

### Issue 8: Admin Buttons Disabled

**Symptoms:**
```
"Add User" button disabled for admin
```

**Solutions:**
1. Check user role in localStorage
   ```javascript
   JSON.parse(localStorage.getItem("user")).role
   // Should be "admin"
   ```

2. Try switching role in database
   ```javascript
   db.users.updateOne(
     {email: "admin@example.com"},
     {$set: {role: "admin"}}
   )
   ```

3. Clear cache and reload page

---

## 📋 Verification Checklist

### After Installation

- [ ] Backend npm packages installed
- [ ] Frontend npm packages installed
- [ ] MongoDB running and accessible
- [ ] .env files created in both backend and frontend
- [ ] Default admin created successfully
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors

### After First Login

- [ ] Can login with aryanantal18@gmail.com / Aryan8864#
- [ ] Redirected to /admin dashboard
- [ ] Dashboard shows statistics
- [ ] Navigation sidebar visible
- [ ] User info displays correctly
- [ ] localStorage contains token and user

### After Creating User

- [ ] User appears in users table
- [ ] Can edit the new user
- [ ] Can delete the new user
- [ ] All changes reflected immediately

### After Logout

- [ ] Redirected to /login
- [ ] localStorage cleared
- [ ] Cannot access /admin directly

---

## 🔍 Debug Mode

### Enable Verbose Logging

**Backend (server.js):**
```javascript
// Add before routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

**Frontend (debug in console):**
```javascript
// In any component
console.log("Token:", localStorage.getItem("token"));
console.log("User:", localStorage.getItem("user"));
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
```

### Test Database Directly

```bash
mongosh clientforge
db.users.find()
db.contacts.find()
db.projects.find()
```

### Network Inspection

1. Open DevTools → Network tab
2. Perform login
3. Check request/response headers
4. Verify Authorization header is present
5. Check response status codes

---

## ✅ Full Test Scenario

1. **Setup** (5 min)
   - Install deps
   - Create .env files
   - Run seed script

2. **Backend Test** (3 min)
   - Start backend
   - Test /health endpoint
   - Test /api/auth/login

3. **Frontend Test** (5 min)
   - Start frontend
   - Login with admin
   - Access dashboard

4. **Features Test** (10 min)
   - Create user
   - Edit user
   - Delete user
   - View contacts
   - View projects
   - Logout

5. **Security Test** (5 min)
   - Clear localStorage
   - Try accessing /admin (should redirect)
   - Test expired token
   - Try invalid password

**Total Time:** ~30 minutes for complete verification

---

## 📞 Getting Help

If you encounter issues:

1. **Check Logs**
   - Backend: Look at terminal output
   - Frontend: Check browser console
   - Database: Use mongosh to inspect

2. **Verify Environment**
   - All .env variables set correctly
   - All services running (Node, MongoDB)
   - Ports not in use (3000, 5000, 27017)

3. **Review Documentation**
   - QUICK_START_ADMIN.md
   - ADMIN_DASHBOARD_README.md
   - IMPLEMENTATION_SUMMARY.md
   - ARCHITECTURE_OVERVIEW.md

4. **Common Commands**
   ```bash
   # Clear everything and start fresh
   npm run seed
   npm run dev
   
   # Check what's running
   lsof -i 3000  # Frontend
   lsof -i 5000  # Backend
   lsof -i 27017 # MongoDB
   ```

---

**Last Updated:** March 2026
**Tested On:** Node v18+, MongoDB 5.0+, Next.js 14+
