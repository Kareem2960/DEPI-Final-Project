import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Calendar from './pages/Calendar.jsx';
import Todo from './pages/Todo.jsx';
import Main from './pages/Main.jsx';
import Analytics from './pages/Analytics.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex" style={{ minHeight: '100vh' }}>
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
          <div className="flex-grow-1 d-flex flex-column bg-light">
            <Topbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main className="flex-grow-1 p-3">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={
                  <PublicRoute>
                    <Login darkMode={darkMode} setDarkMode={setDarkMode} />
                  </PublicRoute>
                } />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
                  </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                  <ProtectedRoute>
                    <Calendar darkMode={darkMode} setDarkMode={setDarkMode} />
                  </ProtectedRoute>
                } />
                <Route path="/todo" element={
                  <ProtectedRoute>
                    <Todo darkMode={darkMode} setDarkMode={setDarkMode} />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={<Analytics darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="/todo/:taskId" element={<TaskDetailsWrapper darkMode={darkMode} setDarkMode={setDarkMode} />} />

                {/* Default Route */}
                <Route path="/" element={<Main darkMode={darkMode} setDarkMode={setDarkMode} />} />

                {/* Catch-all Route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Add a wrapper to pass tasks from ToDoBoard to TaskDetails
function TaskDetailsWrapper(props) {
  // Use localStorage to get tasks (since ToDoBoard saves there)
  const tasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], inProgress: [], done: [] };
  return <TaskDetails tasks={tasks} {...props} />;
}

export default App;