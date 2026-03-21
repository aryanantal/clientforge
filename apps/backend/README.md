# ClientForge Backend API

A Node.js Express API server that handles project data, user management, and admin functionality.

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB
- **Package Manager**: npm

## Project Structure

```
backend/
├── server.js              # Main server entry point
├── config/
│   └── db.js             # Database connection configuration
├── models/
│   ├── Project.js        # Project data model
│   └── ...
├── routes/
│   ├── projectRoutes.js  # Project endpoints
│   └── ...
├── middleware/           # Custom middleware (if any)
├── controllers/          # Request handlers (optional, future)
├── .env                  # Environment variables (create this)
└── package.json         # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm 9+ or equivalent
- MongoDB database (local or cloud)
- MongoDB connection string (URI)

### Installation

1. Navigate to the backend directory:
```bash
cd apps/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clientforge
NODE_ENV=development
```

### Running the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
# or
node server.js
```

The API will be available at `http://localhost:5000`

## Environment Variables

### Development
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clientforge
NODE_ENV=development
```

### Production
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/clientforge
NODE_ENV=production
```

## API Routes

### Projects Endpoints

#### Get All Projects
```
GET /api/projects
```

Returns all projects from the database.

**Example Response:**
```json
[
  {
    "_id": "507f191e810c19729de860ea",
    "title": "Project Title",
    "description": "Project description",
    "category": "Web Design",
    "image": "/images/project.jpg",
    "featured": true,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Create Project
```
POST /api/projects
Content-Type: application/json

{
  "title": "New Project",
  "description": "Project description",
  "category": "Web Design",
  "image": "/images/project.jpg",
  "featured": false
}
```

**Returns:** Created project object with `_id`

#### Get Single Project
```
GET /api/projects/:id
```

Returns a specific project by ID.

#### Update Project
```
PUT /api/projects/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Project
```
DELETE /api/projects/:id
```

Deletes a specific project.

## Data Models

### Project Model
```javascript
{
  title: String (required),
  description: String (required),
  category: String,
  image: String (URL),
  featured: Boolean (default: false),
  tags: [String],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Database Setup

### Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows (from MongoDB installation directory)
mongod.exe

# Linux
sudo systemctl start mongod
```

3. Create database and initial data (optional):
```bash
mongosh
use clientforge
db.projects.insertOne({
  title: "Sample Project",
  description: "A test project",
  category: "Web Design"
})
```

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string:
   - Click "Connect"
   - Select "Connect your application"
   - Copy the URI
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clientforge?retryWrites=true&w=majority
```

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Middleware

### CORS
Cross-Origin Resource Sharing is configured to allow requests from the frontend.

### Body Parser
Handles JSON and URL-encoded request bodies.

### Error Handling
Generic error handler catches and logs errors.

## Testing Endpoints

### Using cURL
```bash
# Get all projects
curl http://localhost:5000/api/projects

# Create a project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test project"}'

# Get single project
curl http://localhost:5000/api/projects/[PROJECT_ID]
```

### Using REST Client (VSCode Extension)
See `rest-client.http` for example requests.

## Performance Optimization

1. **Database Indexing** - Add indexes on frequently queried fields
2. **Connection Pooling** - MongoDB driver handles connection pooling
3. **Response Caching** - Implement caching for frequently accessed data
4. **Rate Limiting** - Consider adding rate limiting middleware

## Security Considerations

1. **Environment Variables** - Never commit `.env` files
2. **CORS** - Configure CORS properly for production
3. **Input Validation** - Validate all incoming data
4. **Authentication** - Implement JWT or session-based auth (future)
5. **Error Details** - Don't expose sensitive error details in production

## Common Issues

### MongoDB Connection Error
- Check MongoDB is running: `mongosh`
- Verify connection string in `.env`
- Confirm credentials if using Atlas

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (macOS/Linux)
kill -9 <PID>

# Or run on different port
PORT=5001 npm start
```

### CORS Errors
- Ensure frontend URL is allowed in CORS configuration
- Check that Content-Type headers are set correctly

## Future Enhancements

- [ ] User authentication with JWT
- [ ] Admin panel API endpoints
- [ ] File upload handling
- [ ] Email notifications
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Request logging and monitoring
- [ ] Database backups and migrations
- [ ] Unit and integration tests

## Contributing

When adding new features:
1. Create new routes in `routes/` directory
2. Create corresponding models in `models/` directory
3. Use consistent naming conventions
4. Add proper error handling
5. Document new endpoints

## Deployment

### Heroku
```bash
heroku create clientforge-api
git push heroku main
heroku config:set MONGODB_URI=<your-atlas-uri>
```

### Docker
```bash
docker build -t clientforge-api .
docker run -p 5000:5000 -e MONGODB_URI=<uri> clientforge-api
```

## Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [RESTful API Best Practices](https://restfulapi.net)

## License

See LICENSE file in the root directory.
