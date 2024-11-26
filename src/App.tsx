import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './components/auth/AuthProvider';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
import { UnauthorizedPage } from './pages/Unauthorized';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/Dashboard';
import { StudentsPage } from './pages/students';
import { CoursesPage } from './pages/courses';
import { AttendancePage } from './pages/attendance';
import { FeesPage } from './pages/fees';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route
              path="students"
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <StudentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="courses"
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="attendance"
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <AttendancePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="fees"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <FeesPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer position="top-right" />
    </Router>
  );
}

export default App;