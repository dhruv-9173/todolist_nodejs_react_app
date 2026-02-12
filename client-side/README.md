# Client-Side - Todo List Application (React Frontend)

This is the frontend part of the Todo List application built with **React 18**, **Vite**, **Redux Toolkit**, and **React Router**. The application provides a modern, responsive interface for managing tasks with authentication capabilities.

## 🚀 Technology Stack

- **React 18.3.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **Redux Toolkit 2.9.0** - State management
- **React Router DOM 7.8.2** - Client-side routing
- **Axios 1.11.0** - HTTP client for API calls
- **Bootstrap 5.3.8** & **React Bootstrap 2.10.10** - UI styling framework
- **Formik 2.4.6** - Form management
- **Yup 1.7.0** - Form validation

## 📁 Project Structure

```
client-side/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── services/       # API service layer
│   ├── config/         # Configuration files
│   ├── context/        # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Redux store configuration
│   ├── utils/          # Utility functions and Redux slices
│   ├── assets/         # Images, fonts, etc.
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## 🧩 Components

### Core Components

1. **login.jsx** - User login form with Formik integration
2. **register.jsx** - User registration form with validation
3. **header.jsx** - Application header with navigation
4. **addTask.jsx** - Modal component for creating new tasks
5. **TaskList.jsx** - Displays list of tasks with priority indicators
6. **ShowTask.jsx** - Detailed view of a single task
7. **TimeTable.jsx** - Visual timeline/schedule view of tasks
8. **DialogBox.jsx** - Reusable confirmation dialog
9. **Loader.jsx** - Loading spinner component

### Pages

1. **Dashboard.jsx** - Main dashboard showing task list and timetable view
2. **auth.jsx** - Authentication wrapper page for login/register

## 🛣️ Routing

The application uses **React Router v7** for client-side routing:

### Route Structure

```jsx
/                    → Dashboard (if authenticated) or Auth page
/auth                → Authentication wrapper
  ├── /auth/login    → Login page
  └── /auth/register → Register page
```

### Protected Routes

- The root route (`/`) checks authentication status using `AuthContext`
- Authenticated users see the Dashboard
- Unauthenticated users are redirected to the Auth page

### Route Configuration (App.jsx)

```jsx
<Router>
  <Routes>
    <Route path="/" element={isAuthenticated ? <Dashboard /> : <Auth />} />
    <Route path="/auth" element={<Auth />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  </Routes>
</Router>
```

## 🔌 API Integration

### API Client Configuration

**Location**: `src/config/apiClient.jsx`

The application uses Axios with a configured instance that includes:

- **Base URL**: `http://localhost:3000`
- **Request Interceptor**: Automatically attaches JWT token from localStorage
- **Response Interceptor**: Handles 401 Unauthorized responses

### API Services

#### 1. AuthService (`src/services/AuthService.jsx`)

Handles user authentication:

```javascript
- handleRegister(request) → POST /user/register
- handleLogin(request)    → POST /user/login
```

#### 2. AppService (`src/services/AppService.jsx`)

Handles task-related operations:

```javascript
- handlegetList()          → GET /task          (Fetch all tasks)
- handleaddTask(request)   → POST /task         (Create new task)
- deleteTask(request)      → DELETE /task/:id   (Delete task)
- updateTask(request)      → PUT /task          (Update task)
- getTimeTable()           → Returns []         (Placeholder for future feature)
```

### API Request Flow

1. **Authentication Flow**:
   - User submits login/register form
   - Custom hook (useLogin/useRegister) calls AuthService
   - On success, JWT token is stored in localStorage
   - AuthContext updates authentication state
   - User is redirected to Dashboard

2. **Task Management Flow**:
   - Dashboard fetches tasks using Redux Toolkit async thunk
   - User actions (add/update/delete) dispatch Redux actions
   - Service layer makes API calls with authenticated token
   - Redux store updates with response data
   - UI re-renders automatically

## 🗄️ State Management

### Redux Toolkit

**Store Configuration**: `src/store/store.jsx`

The application uses Redux Toolkit for global state management:

#### Task Slice (`src/utils/taskSlice.jsx`)

**State Shape**:
```javascript
{
  items: [],      // Array of task objects
  loading: false, // Loading state for async operations
  error: null     // Error message if any
}
```

**Actions**:
- `addTask(task)` - Add new task to state
- `deleteTask(taskId)` - Remove task from state
- `updateTask(task)` - Update existing task

**Async Thunks**:
- `fetchTasks()` - Fetch all tasks from API

### Context API

#### AuthContext (`src/context/AuthContext.jsx`)

Manages authentication state globally:

**State**:
- `isAuthenticated` - Boolean indicating login status
- `user` - Current user object

**Methods**:
- `Signin(token)` - Mark user as authenticated
- `Signout()` - Clear authentication and redirect
- `getUser()` - Get current user data

## 🎣 Custom Hooks

1. **useAuthContext.jsx** - Access authentication context
2. **useLogin.jsx** - Handle login form submission and state
3. **useRegister.jsx** - Handle registration form submission
4. **useAddTask.jsx** - Handle add task form logic
5. **useTime.jsx** - Provides current date and time updates

## 🎨 Styling

- **Bootstrap 5** for responsive grid and components
- **Bootstrap Icons** for iconography
- **Custom CSS** in `index.css` for additional styling
- **React Bootstrap** components for enhanced UI elements

## 🔧 Development Scripts

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🔐 Authentication Flow

1. **Initial Load**:
   - App checks localStorage for existing token
   - If found, AuthContext marks user as authenticated
   - User is directed to Dashboard

2. **Login**:
   - User enters credentials in login form
   - `useLogin` hook calls `AuthService.handleLogin()`
   - On success, token is saved and user is authenticated
   - Redirect to Dashboard

3. **Registration**:
   - User fills registration form with validation
   - `useRegister` hook calls `AuthService.handleRegister()`
   - Account created, user can then login

4. **Logout**:
   - User clicks logout (in Header component)
   - AuthContext.Signout() clears token
   - User is redirected to login page

## 🔒 Protected Routes

The application implements route protection:

- Root route checks `isAuthenticated` from AuthContext
- If not authenticated, shows Auth page
- Dashboard component also checks auth status on mount
- Redirects to `/auth/login` if session expires

## 📦 Key Dependencies

- **@reduxjs/toolkit** - State management
- **react-router-dom** - Routing
- **axios** - HTTP client
- **formik** - Form handling
- **yup** - Schema validation
- **bootstrap** & **react-bootstrap** - UI components

## 🌐 API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/register` | Register new user |
| POST | `/user/login` | Login user |
| GET | `/task` | Get all tasks |
| POST | `/task` | Create new task |
| PUT | `/task` | Update task |
| DELETE | `/task/:id` | Delete task |

## 🚀 Getting Started

1. **Clone the repository**
2. **Navigate to client-side folder**: `cd client-side`
3. **Install dependencies**: `npm install`
4. **Configure API URL**: Update `baseURL` in `src/config/apiClient.jsx` if needed
5. **Start the dev server**: `npm run dev`
6. **Open browser**: Navigate to `http://localhost:5173`

## 📝 Notes

- The application expects the backend API to be running on `http://localhost:3000`
- JWT tokens are stored in localStorage with key `"user"`
- All API requests automatically include the Authorization header when a token is present
- The app uses Vite's HMR (Hot Module Replacement) for fast development

## 🔮 Future Enhancements

- TypeScript integration
- Unit and integration tests
- PWA capabilities
- Dark mode support
- Advanced filtering and sorting
- Task categories and tags
- Notifications and reminders
