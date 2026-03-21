# Quick Start Guide - Admin Dashboard

## 1. Backend Setup (5 minutes)

```bash
# Navigate to backend
cd apps/backend

# Install new dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your MongoDB URI and configuration
nano .env

# Create default admin user
npm run seed

# Start the backend
npm run dev
```

**Default Admin Login:**
- Email: `aryanantal18@gmail.com`
- Password: `Aryan8864#`

## 2. Frontend Setup (2 minutes)

```bash
# Navigate to frontend
cd apps/frontend

# Make sure .env.local has API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Start frontend (if not already running)
npm run dev
```

## 3. Access the Admin Dashboard

**Open in browser:**
- Frontend: `http://localhost:3000`
- Login Page: `http://localhost:3000/login`
- Admin Dashboard: `http://localhost:3000/admin`

**Login with:**
- Email: `admin@example.com`
- Password: `admin123`

## 4. First Steps

1. ✅ Login to admin dashboard
2. ✅ Change default admin password
3. ✅ Create additional admin/user accounts
4. ✅ View and manage contacts
5. ✅ Manage projects

## Features Available

- 📊 Dashboard with statistics
- 👥 User management (create, edit, delete)
- 📧 Contact submissions viewer
- 📁 Project management
- 🔐 Secure authentication
- 🎨 Consistent styling with main site

## API Endpoints

**Auth:**
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/users`
- `POST /api/auth/users`
- `PUT /api/auth/users/:userId`
- `DELETE /api/auth/users/:userId`

**Contacts:**
- `GET /api/contact/all`
- `DELETE /api/contact/:id`

## Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/clientforge
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "No user exist" | Run `npm run seed` in backend |
| MongoDB error | Ensure MongoDB is running |
| Login not working | Check MONGO_URI in .env |
| API not responding | Verify backend is running on port 5000 |
| Blank dashboard | Clear localStorage in browser and login again |

## Security Notes

⚠️ **Important:**
- Change default password immediately after first login
- Use strong passwords in production
- Keep JWT_SECRET secure
- Don't share admin credentials

## Support

See `ADMIN_DASHBOARD_README.md` for detailed documentation.
