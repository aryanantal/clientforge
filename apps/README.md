# ClientForge - Full-Stack Developer Portfolio Platform

A comprehensive full-stack web application that serves as a developer portfolio with a custom CMS for managing projects and content.

## Overview

ClientForge is a modern web platform combining a React-based frontend with a Node.js/Express API backend, all connected to MongoDB for data storage. It provides developers with a complete solution to showcase their work, manage projects, and maintain an online presence.

## Project Architecture

```
ClientForge/
├── apps/
│   ├── frontend/          # Next.js React application
│   ├── backend/           # Express.js API server
│   └── shared/            # Shared constants and utilities
├── package.json           # Root package configuration
└── README.md             # This file
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (React 18+)
- **Styling**: Tailwind CSS + CSS Variables
- **Language**: TypeScript
- **Build Tool**: Webpack (Next.js)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **API**: RESTful

### Shared
- **Constants**: Design tokens, navigation links
- **Utilities**: Common functions and helpers

## Features

### Current Features
- ✅ Responsive design system with comprehensive component library
- ✅ Reusable Header and Footer components
- ✅ Complete style guide documentation
- ✅ CSS variables for consistent theming
- ✅ Dark mode support
- ✅ Mobile-first responsive design
- ✅ Project REST API with CRUD operations
- ✅ MongoDB integration

### Planned Features
- 🔄 User authentication and authorization
- 🔄 Admin panel for content management
- 🔄 Blog functionality with categories
- 🔄 Contact form with email integration
- 🔄 Image optimization and CDN integration
- 🔄 Analytics and tracking
- 🔄 Search functionality
- 🔄 API documentation (Swagger/OpenAPI)
- 🔄 Unit and integration tests
- 🔄 CI/CD pipeline

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher ([Download](https://nodejs.org))
- **npm**: Version 9 or higher (comes with Node.js)
- **MongoDB**: Either [local installation](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas)
- **Git**: For version control

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd clientforge
```

2. **Install root dependencies**
```bash
npm install
```

3. **Set up the Frontend**
```bash
cd apps/frontend
npm install
cp .env.example .env.local  # Create environment file
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. **Set up the Backend**
```bash
cd ../backend
npm install
cp .env.example .env  # Create environment file
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clientforge
NODE_ENV=development
```

## Running the Application

### Option 1: Run Services Separately

**Terminal 1 - Backend Server**
```bash
cd apps/backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend Development**
```bash
cd apps/frontend
npm run dev
# Application runs on http://localhost:3000
```

### Option 2: Run from Root Directory

If you have concurrent commands available:
```bash
npm run dev  # (if configured in root package.json)
```

## Project Structure

### Frontend (`apps/frontend/`)
```
frontend/
├── app/
│   ├── components/              # Reusable React components
│   │   ├── Header.tsx          # Navigation component
│   │   ├── Footer.tsx          # Footer component
│   │   └── ...
│   ├── style-guide/            # Design system documentation
│   ├── globals.css             # Global styles & design tokens
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── public/                      # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

### Backend (`apps/backend/`)
```
backend/
├── server.js                   # Express server entry point
├── config/
│   └── db.js                  # MongoDB connection
├── models/
│   ├── Project.js             # Project data model
│   └── ...
├── routes/
│   ├── projectRoutes.js       # Project API endpoints
│   └── ...
├── .env                       # Environment variables
└── package.json               # Dependencies
```

### Shared (`apps/shared/`)
```
shared/
├── constants/
│   ├── api.js                # API constants
│   ├── navigation.js         # Navigation & footer links
│   ├── routes.js             # Route definitions
│   ├── styleGuide.js         # Design tokens
│   └── index.js              # Barrel export
└── package.json
```

## Design System

The application uses a comprehensive design system with:

### Color Palette
- **Primary**: #166534 (Dark Green)
- **Secondary**: #15803d (Green)
- **Accent**: #4ade80 (Light Green)
- **Neutrals**: White to Black
- **Destructive**: #ef4444 (Red)

### Typography Scale
- Display Large, Display Medium, Display Small
- Heading, Body Large, Body, Body Small
- Caption

### Spacing Scale
10-level scale from 4px (xs) to 48px (5xl)

### Responsive Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Component Library
- Buttons (Primary, Secondary, Ghost, Outline)
- Cards (Standard, Elevated)
- Badges (Primary, Secondary)
- Form elements

Full design system documentation available at `/style-guide` when the app is running.

## API Documentation

### Projects Endpoint
```
GET    /api/projects          # Get all projects
POST   /api/projects          # Create a project
GET    /api/projects/:id      # Get specific project
PUT    /api/projects/:id      # Update project
DELETE /api/projects/:id      # Delete project
```

See `apps/backend/README.md` for detailed API documentation.

## Environment Configuration

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clientforge
NODE_ENV=development
```

## Database Setup

### Local MongoDB
```bash
# Start MongoDB service
brew services start mongodb-community  # macOS
# or
sudo systemctl start mongod            # Linux

# Create database and seed data
mongosh
use clientforge
db.projects.insertOne({...})
```

### MongoDB Atlas (Cloud)
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create cluster and get connection string
3. Update `.env` with connection URI

## Development Workflow

### Making Changes

1. **Frontend Changes**: Edit files in `apps/frontend/app/`
2. **Backend Changes**: Edit files in `apps/backend/`
3. **Shared Constants**: Update `apps/shared/constants/`

### Component Development
- Components go in `apps/frontend/app/components/`
- Use shared constants for styling
- Follow TypeScript types
- Test responsive design

### Adding Routes
- Frontend: Create page in `apps/frontend/app/[route]/`
- Backend: Add route in `apps/backend/routes/`

## Testing

### Manual Testing
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/projects`
- Style Guide: `http://localhost:3000/style-guide`

### REST Client Testing
Use VSCode REST Client extension or Postman to test API endpoints.

## Building for Production

### Frontend
```bash
cd apps/frontend
npm run build
npm run start
```

### Backend
```bash
cd apps/backend
# Set NODE_ENV=production in .env
npm start
```

## Deployment

### Hosting Options

**Frontend (Vercel)**
```bash
npm install -g vercel
cd apps/frontend
vercel
```

**Backend (Heroku)**
```bash
heroku create clientforge-api
git push heroku main
```

**Database (MongoDB Atlas)**
- Create cluster on MongoDB Atlas
- Get connection string
- Set `MONGODB_URI` in production environment

## Performance

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS extraction and minification
- Static generation for better performance
- Font optimization with next/font

## Security Best Practices

1. Never commit `.env` files to version control
2. Use environment variables for sensitive data
3. Validate all user input on both frontend and backend
4. Implement CORS properly for production
5. Use HTTPS in production
6. Keep dependencies updated: `npm audit`

## Troubleshooting

### Backend won't connect to MongoDB
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database credentials
- Test with MongoDB CLI: `mongosh`

### Frontend can't reach backend
- Backend must be running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is configured in backend
- Check network tab in browser DevTools

### Style changes not appearing
```bash
cd apps/frontend
rm -rf .next
npm run dev
```

### Port already in use
```bash
# Find process on port
lsof -i :3000    # Frontend
lsof -i :5000    # Backend

# Kill process
kill -9 <PID>
```

## Contributing

1. Create a feature branch: `git checkout -b feature/name`
2. Make changes following project conventions
3. Test thoroughly: frontend + backend + responsive
4. Commit with clear messages
5. Push and create a pull request

## Commit Convention

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code style changes
refactor: Refactor code
test: Add/update tests
chore: Dependency updates
```

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Docs](https://react.dev)

### Tools
- [Postman](https://www.postman.com) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VSCode](https://code.visualstudio.com) - Code editor

### Learning Resources
- [Next.js Tutorial](https://nextjs.org/learn)
- [Express.js Guide](https://expressjs.com/starter/basic-routing.html)
- [MongoDB University](https://university.mongodb.com)

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feature requests, please open an issue on the GitHub repository.

## Changelog

See CHANGELOG.md for version history and updates.

## Authors

Created as a modern developer portfolio platform.

---

**Last Updated**: 2024
**Version**: 1.0.0
