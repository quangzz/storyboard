import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import UserPage from './pages/UserPage';
import DragDropPage from './pages/DragDropPage';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import DashboardPage from './pages/DashboardPage';

// Wrapper component để kết hợp nhiều providers
const Providers = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      {children}
    </UserProvider>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Providers>
        <Navigate to="/login" replace />
      </Providers>
    ),
  },
  {
    path: '/login',
    element: (
      <Providers>
        <LoginPage />
      </Providers>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Providers>
        <DashboardPage />
      </Providers>
    ),
  },
  {
    path: '/upload',
    element: (
      <Providers>
        <UploadPage />
      </Providers>
    ),
  },
  {
    path: '/drag-drop',
    element: (
      <Providers>
        <DragDropPage />
      </Providers>
    ),
  },
  {
    path: '/user',
    element: (
      <Providers>
        <UserPage />
      </Providers>
    ),
  },
  {
    path: '*',
    element: (
      <Providers>
        <Navigate to="/login" replace />
      </Providers>
    ),
  },
]);

export default router; 