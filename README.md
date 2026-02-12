# 📝 Todo List Application

A full-stack Todo List application built with **Node.js**, **Express**, **MongoDB**, and **React**. This application provides user authentication, task management with priority levels, and deadline tracking capabilities.


## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Usage](#-usage)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### User Management
- 🔐 **User Registration** - Create new user accounts with email and password
- 🔑 **User Login** - Secure authentication with JWT tokens
- 👤 **User Profile** - Store user information (name, email)

### Task Management
- ✅ **Create Tasks** - Add new tasks with name, description, priority, and deadline
- 📋 **View All Tasks** - Retrieve all tasks for authenticated users
- ✏️ **Update Tasks** - Modify task details and status
- 🗑️ **Delete Tasks** - Remove completed or unwanted tasks
- 🎯 **Priority Levels** - Organize tasks by High, Medium, or Low priority
- 📅 **Deadline Tracking** - Set and monitor task deadlines
- 🔄 **Status Management** - Track tasks as PENDING or COMPLETED

### Security
- 🛡️ **JWT Authentication** - Token-based authentication system
- 🔒 **Protected Routes** - Middleware-based route protection
- 🚫 **Authorization Checks** - User-specific task access control

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | JavaScript runtime environment | - |
| **Express.js** | Web application framework | ^5.1.0 |
| **MongoDB** | NoSQL database | - |
| **Mongoose** | MongoDB object modeling | ^8.18.0 |
| **JSON Web Token (JWT)** | Authentication & authorization | ^9.0.2 |
| **CORS** | Cross-Origin Resource Sharing | ^2.8.5 |
| **Nodemon** | Development auto-reload | ^3.1.10 |

### Frontend
- **React** - User interface library
- **Vite** - Build tool and dev server (port 5173)

---

## 📂 Project Structure

```
todolist_nodejs_react_app/
│
├── backend/                          # Backend API server
│   ├── config/                       # Configuration files
│   │   └── dbhandler.js             # MongoDB connection handler
│   │
│   ├── Controllers/                  # Request handlers (business logic)
│   │   ├── taskController.js        # Task CRUD operations
│   │   └── userController.js        # User registration & login
│   │
│   ├── Middlewares/                  # Express middlewares
│   │   └── auth.js                  # JWT authentication middleware
│   │
│   ├── models/                       # Mongoose schemas
│   │   ├── taskModel.js             # Task schema definition
│   │   └── userModel.js             # User schema definition
│   │
│   ├── Routes/                       # API route definitions
│   │   ├── taskRoutes.js            # Task endpoints
│   │   └── userRoutes.js            # User endpoints
│   │
│   ├── Service/                      # Business logic layer
│   │   ├── authService.js           # JWT token operations
│   │   ├── taskService.js           # Task database operations
│   │   └── userService.js           # User database operations
│   │
│   ├── index.js                      # Application entry point
│   └── package.json                  # Dependencies & scripts
│
└── client-side/                      # React frontend application
    ├── src/                          # Source files
    ├── public/                       # Static assets
    └── package.json                  # Frontend dependencies

```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhruv-9173/todolist_nodejs_react_app.git
   cd todolist_nodejs_react_app
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Ensure MongoDB is running**
   ```bash
   # Start MongoDB service
   mongod
   ```

5. **Start the development server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

   Server will start at `http://localhost:3000`

### Frontend Setup

1. **Navigate to client-side directory**
   ```bash
   cd client-side
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   Application will be available at `http://localhost:5173`

---

## ⚙️ Configuration

### Database Configuration
Located in `backend/config/dbhandler.js`:

```javascript
// Default MongoDB connection
mongodb://127.0.0.1:27017/TODOLIST
```

**To modify:**
- Update the connection string in `backend/index.js`
- Environment variables recommended for production

### CORS Configuration
Located in `backend/index.js`:

```javascript
app.use(cors({ origin: "http://localhost:5173" }));
```

**To modify:**
- Update origin for different client URLs
- Use environment variables for production

### JWT Secret Key
Located in `backend/Service/authService.js`:

```javascript
const secretkey = "rishab";
```

**⚠️ Security Warning:** 
- Change this secret key before deployment
- Use strong, random strings
- Store in environment variables (`.env` file)

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### User Endpoints

#### 1. Register User
**Endpoint:** `POST /user/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 201):**
```json
{
  "message": "User Successfully Registered"
}
```

**Response (Error - 409):**
```json
{
  "message": "Email already exits"
}
```

---

#### 2. Login User
**Endpoint:** `POST /user/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 400):**
```json
{
  "message": "Invalid Credentials"
}
```

---

### Task Endpoints
**Note:** All task endpoints require authentication. Include JWT token in headers:
```
Authorization: Bearer <your_jwt_token>
```

#### 1. Create Task
**Endpoint:** `POST /task`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Complete project documentation",
  "description": "Write comprehensive README for the project",
  "priority": "High",
  "deadline": "2026-02-20"
}
```

**Priority Values:** `"High"`, `"Medium"`, `"Low"`

**Response (Success - 201):**
```json
{
  "message": "Task Successfully Added",
  "data": {
    "_id": "60d5ec49f1b2c72b8c8e4f1a",
    "email": "john@example.com",
    "name": "Complete project documentation",
    "description": "Write comprehensive README for the project",
    "priority": "High",
    "deadline": "2026-02-20",
    "status": "PENDING",
    "createdAt": "1624629321000"
  }
}
```

---

#### 2. Get All Tasks
**Endpoint:** `GET /task`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "status": [
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1a",
      "email": "john@example.com",
      "name": "Complete project documentation",
      "description": "Write comprehensive README for the project",
      "priority": "High",
      "deadline": "2026-02-20",
      "status": "PENDING",
      "createdAt": "1624629321000"
    },
    {
      "_id": "60d5ec49f1b2c72b8c8e4f1b",
      "email": "john@example.com",
      "name": "Review pull requests",
      "description": "Check and merge pending PRs",
      "priority": "Medium",
      "deadline": "2026-02-15",
      "status": "COMPLETED",
      "createdAt": "1624629322000"
    }
  ]
}
```

---

#### 3. Update Task
**Endpoint:** `PUT /task`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "_id": "60d5ec49f1b2c72b8c8e4f1a",
  "email": "john@example.com",
  "name": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "priority": "High",
  "deadline": "2026-02-22",
  "status": "COMPLETED"
}
```

**Status Values:** `"PENDING"`, `"COMPLETED"`

**Response (Success - 200):**
```json
{
  "status": "Task updated successfully"
}
```

---

#### 4. Delete Task
**Endpoint:** `DELETE /task/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Task ID to delete

**Example:**
```
DELETE /task/60d5ec49f1b2c72b8c8e4f1a
```

**Response (Success - 200):**
```json
{
  "status": "Task Deleted Scuccessfully"
}
```

**Response (Error - 404):**
```json
{
  "status": "Invalid Email Or Taskid"
}
```

---

## 🗄️ Database Schema

### User Schema
Located in `backend/models/userModel.js`:

```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}
```

**Collection Name:** `users`

---

### Task Schema
Located in `backend/models/taskModel.js`:

```javascript
{
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED"],
    required: true,
    default: "PENDING"
  },
  deadline: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now()
  }
}
```

**Collection Name:** `tasks`

---

## 🔐 Authentication

### JWT Implementation

The application uses **JSON Web Tokens (JWT)** for stateless authentication.

#### Token Creation
Located in `backend/Service/authService.js`:

```javascript
const createToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    secretkey
  );
};
```

#### Token Validation
```javascript
const validateToken = (token) => {
  if (!token) return null;
  return jwt.verify(token, secretkey);
};
```

#### Authentication Middleware
Located in `backend/Middlewares/auth.js`:

```javascript
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && validateToken(token.split("Bearer ")[1])) {
    return next();
  }
  return res.status(401).json({ status: "Invalid Token" });
};
```

### Authentication Flow

1. **User Registration**
   - User submits credentials
   - Password stored (⚠️ **Note:** Currently stored as plain text - consider using bcrypt)
   - User document created in MongoDB

2. **User Login**
   - Credentials validated against database
   - JWT token generated with user email
   - Token returned to client

3. **Protected Requests**
   - Client includes token in `Authorization` header
   - Middleware validates token
   - Request proceeds if valid, otherwise 401 error

4. **Token Usage**
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 💻 Usage

### Example Workflow

1. **Register a new user**
   ```bash
   curl -X POST http://localhost:3000/user/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "password": "myPassword123"
     }'
   ```

2. **Login to get token**
   ```bash
   curl -X POST http://localhost:3000/user/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "myPassword123"
     }'
   ```

3. **Create a task (using token)**
   ```bash
   curl -X POST http://localhost:3000/task \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -d '{
       "name": "Buy groceries",
       "description": "Milk, bread, eggs",
       "priority": "Medium",
       "deadline": "2026-02-15"
     }'
   ```

4. **Get all tasks**
   ```bash
   curl -X GET http://localhost:3000/task \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

5. **Update task status**
   ```bash
   curl -X PUT http://localhost:3000/task \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -d '{
       "_id": "TASK_ID_HERE",
       "email": "john@example.com",
       "name": "Buy groceries",
       "description": "Milk, bread, eggs",
       "priority": "Medium",
       "deadline": "2026-02-15",
       "status": "COMPLETED"
     }'
   ```

6. **Delete a task**
   ```bash
   curl -X DELETE http://localhost:3000/task/TASK_ID_HERE \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

---

## 🔧 Development

### Available Scripts

**Backend (`/backend`):**
```bash
npm start       # Start production server
npm run dev     # Start development server with auto-reload
npm test        # Run tests (not yet configured)
```

**Frontend (`/client-side`):**
```bash
npm run dev     # Start Vite development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Development Best Practices

1. **Environment Variables**
   - Create `.env` file for sensitive data
   - Store JWT secret, database URL, API keys
   - Never commit `.env` to version control

   Example `.env`:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/TODOLIST
   JWT_SECRET=your_secure_random_string_here
   CORS_ORIGIN=http://localhost:5173
   ```

2. **Code Organization**
   - **Controllers:** Handle HTTP requests/responses
   - **Services:** Implement business logic
   - **Models:** Define data structure
   - **Middlewares:** Process requests before controllers
   - **Routes:** Define API endpoints

3. **Error Handling**
   - All endpoints return appropriate HTTP status codes
   - Consistent error response format
   - Try-catch blocks for async operations

---

## 🔒 Security Considerations

### Current Implementation

⚠️ **Important Security Notes:**

1. **Password Storage**
   - Currently storing passwords as **plain text**
   - **Recommendation:** Implement `bcrypt` for password hashing
   ```javascript
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

2. **JWT Secret**
   - Hardcoded secret key in source code
   - **Recommendation:** Use environment variables
   ```javascript
   const secretkey = process.env.JWT_SECRET;
   ```

3. **Input Validation**
   - Basic validation implemented
   - **Recommendation:** Use validation libraries like `joi` or `express-validator`

4. **CORS Configuration**
   - Currently allows single origin
   - **Recommendation:** Configure based on environment

### Recommended Improvements

```bash
# Install security packages
npm install bcrypt helmet express-validator dotenv
```

**Example improved authentication:**
```javascript
// Hash password before saving
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(user.password, saltRounds);

// Compare passwords during login
const isMatch = await bcrypt.compare(inputPassword, storedPassword);
```

**Add Helmet for security headers:**
```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 🐛 Known Issues

1. **Password Security:** Passwords stored in plain text (needs hashing)
2. **JWT Expiration:** Tokens don't expire (add expiration time)
3. **Error Messages:** Some typos in error messages ("Scuccessfully", "exits")
4. **Token Refresh:** No refresh token mechanism implemented

---

## 🚧 Future Enhancements

- [ ] Add password hashing with bcrypt
- [ ] Implement JWT token expiration and refresh
- [ ] Add input validation middleware
- [ ] Implement pagination for tasks list
- [ ] Add task filtering and sorting
- [ ] Add task categories/tags
- [ ] Implement task reminders
- [ ] Add user profile management
- [ ] Add password reset functionality
- [ ] Implement task sharing between users
- [ ] Add file attachments to tasks
- [ ] Create comprehensive test suite
- [ ] Add API rate limiting
- [ ] Implement logging system
- [ ] Add Docker support
- [ ] Create API documentation with Swagger

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation for API changes
- Write meaningful commit messages
- Test your changes thoroughly

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Dhruv Kumar**  
GitHub: [@dhruv-9173](https://github.com/dhruv-9173)

---

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/dhruv-9173/todolist_nodejs_react_app/issues)
- Contact: [Create an issue with your question]

---

## 🙏 Acknowledgments

- Express.js for the robust web framework
- MongoDB for flexible NoSQL database
- React for powerful UI development
- The Node.js community for excellent packages

---

## 📚 Additional Resources

### REST API Tools & Dependencies

#### **Express.js** (v5.1.0)
- **Purpose:** Web application framework for Node.js
- **Features Used:**
  - Routing system
  - Middleware support
  - JSON parsing (`express.json()`)
  - URL encoding (`express.urlencoded()`)
- **Documentation:** [expressjs.com](https://expressjs.com/)

#### **Mongoose** (v8.18.0)
- **Purpose:** MongoDB object modeling for Node.js
- **Features Used:**
  - Schema definition
  - Model creation
  - CRUD operations
  - Query building
  - Data validation
- **Documentation:** [mongoosejs.com](https://mongoosejs.com/)

#### **CORS** (v2.8.5)
- **Purpose:** Enable Cross-Origin Resource Sharing
- **Configuration:** Allows frontend (port 5173) to access backend (port 3000)
- **Usage:** 
  ```javascript
  app.use(cors({ origin: "http://localhost:5173" }));
  ```
- **Documentation:** [npmjs.com/package/cors](https://www.npmjs.com/package/cors)

#### **JSON Web Token - JWT** (v9.0.2)
- **Purpose:** Authentication and authorization
- **Methods Used:**
  - `jwt.sign()` - Create tokens
  - `jwt.verify()` - Validate tokens
  - `jwt.decode()` - Decode token payload
- **Documentation:** [jwt.io](https://jwt.io/)

#### **Nodemon** (v3.1.10)
- **Purpose:** Development tool for auto-restarting server
- **Usage:** `npm run dev`
- **Documentation:** [nodemon.io](https://nodemon.io/)

### Architecture Patterns

This application follows the **MVC (Model-View-Controller)** pattern with a service layer:

1. **Models** - Data structure and database schemas
2. **Controllers** - Handle HTTP requests and responses
3. **Services** - Business logic and database operations
4. **Routes** - API endpoint definitions
5. **Middlewares** - Request processing and authentication

### HTTP Status Codes Used

| Code | Meaning | Usage in App |
|------|---------|--------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful user/task creation |
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Invalid or missing token |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate email registration |
| 500 | Server Error | Internal server errors |

---

**Happy Coding! 🚀**
