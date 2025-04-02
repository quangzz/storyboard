import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../components/Layout/MainLayout';
import HomePage from '../pages/HomePage';
import UploadPage from '../pages/UploadPage';
import DragDropPage from '../pages/DragDropPage';
import UserPage from '../pages/UserPage';
// Import các pages khác...

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/home',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'upload',
        element: <UploadPage />
      },
      {
        path: 'dragdrop',
        element: <DragDropPage />
      },
      {
        path: 'user',
        element: <UserPage />
      }
    ]
  }
]);

export default router;