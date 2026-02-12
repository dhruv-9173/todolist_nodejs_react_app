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
