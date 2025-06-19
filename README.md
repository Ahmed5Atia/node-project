# Task Management API 📋

A comprehensive RESTful API for task management with user authentication, filtering, searching, pagination, and email reminders.

## Made By:

Ahmed Abdelrady Khalifa
Ahmed Mahmoud Atia
Ragab Rasmy Hussien
Taha Mustafa Fuad

## Features ✨

- 🔐 **User Authentication**: JWT-based registration and login
- 📝 **Task Management**: Complete CRUD operations for tasks
- 🔍 **Advanced Search**: Search tasks by title, description, or category
- 🎯 **Smart Filtering**: Filter tasks by category, priority, or status
- 📄 **Pagination**: Efficient data loading with pagination support
- ⏰ **Email Reminders**: Automated email notifications for task reminders
- 🛡️ **Secure**: Protected routes with JWT middleware
- 📊 **Database Indexing**: Optimized queries with MongoDB indexes

## Tech Stack 🚀

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer
- **Task Scheduling**: node-cron
- **Environment Management**: dotenv

## Installation & Setup 🛠️

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or remotely)
- Gmail account (for email notifications)

### 1. Clone the repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
JWT_SECRET=your_super_secure_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Note**: For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833?hl=en) if 2FA is enabled.

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod
```

### 5. Run the application
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Documentation 📚

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123"
}
```

**Response**: Returns JWT token for authentication
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Task Endpoints
All task endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Tasks (with filtering, searching, pagination)
```http
GET /tasks?category=Work&priority=High&status=Pending&search=meeting&pageNumber=1
```

**Query Parameters**:
- `category`: Filter by task category
- `priority`: Filter by priority (Low, Medium, High)
- `status`: Filter by status (Pending, In Progress, Completed)
- `search`: Search in title, description, or category
- `pageNumber`: Page number for pagination

#### Create Task
```http
POST /tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "dueDate": "2025-06-20T18:00:00.000Z",
  "priority": "High",
  "status": "Pending",
  "category": "Work",
  "reminder": "2025-06-20T16:00:00.000Z"
}
```

#### Update Task
```http
PUT /tasks/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "Completed",
  "reminder": "2025-06-21T10:00:00.000Z"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

### User Management Endpoints

#### Get All Users
```http
GET /users
Authorization: Bearer <token>
```

#### Get User by ID
```http
GET /users/:id
Authorization: Bearer <token>
```

#### Update User
```http
PUT /users/:id
Authorization: Bearer <token>

{
  "firstName": "Jane",
  "email": "jane@example.com"
}
```

#### Delete User
```http
DELETE /users/:id
Authorization: Bearer <token>
```

## Data Models 📋

### User Model
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  firstName: String (required),
  lastName: String (required),
  email: String,
  role: String (enum: ["admin", "user", "reporter"], default: "user"),
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String (required),
  dueDate: Date (required),
  priority: String (enum: ["Low", "Medium", "High"], required),
  status: String (enum: ["Pending", "In Progress", "Completed"], required),
  category: String,
  owner: ObjectId (ref: "User", required),
  reminder: Date,
  reminderSent: Boolean (default: false),
  timestamps: true
}
```

## Email Reminder System 📧

The application includes an automated email reminder system:

- **Frequency**: Checks for due reminders every minute
- **Trigger**: Sends email when `reminder` time is reached
- **Prevention**: Uses `reminderSent` flag to avoid duplicate emails
- **Content**: Includes task title, description, and due date

### Testing Email Reminders

1. Create a task with a `reminder` field set 1-2 minutes in the future
2. Wait for the reminder time
3. Check your email inbox (including spam folder)
4. Verify the task's `reminderSent` field is updated to `true`

## Testing Examples 🧪

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123","firstName":"Test","lastName":"User","email":"test@example.com"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Create a task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Task","description":"Test Description","dueDate":"2025-06-20T18:00:00.000Z","priority":"High","status":"Pending","category":"Test"}'
```

**Search and filter tasks:**
```bash
curl "http://localhost:3000/tasks?search=test&priority=High&pageNumber=1" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Project Structure 📁

```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── jobs/
│   │   └── reminderJob.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   └── utils/
│       ├── sendEmail.js
│       └── testEmail.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Security Features 🔒

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Role-based Access**: User roles (admin, user, reporter)
- **Input Validation**: Required field validation
- **Environment Variables**: Sensitive data stored in .env file
- **Protected Routes**: Authentication middleware on protected endpoints

## Performance Optimizations ⚡

- **Database Indexing**: Optimized queries with MongoDB indexes
- **Pagination**: Efficient data loading with skip/limit
- **Selective Population**: Only populate necessary fields
- **Query Optimization**: Efficient filtering and searching

## Error Handling 🚨

The API includes comprehensive error handling:
- **Authentication Errors**: Invalid tokens, expired sessions
- **Validation Errors**: Missing required fields, invalid data types
- **Database Errors**: Connection issues, query failures
- **Server Errors**: 500 status codes with descriptive messages

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support 💬

For support and questions, please open an issue in the repository or contact the development team.

**Happy Task Managing! 🎉**