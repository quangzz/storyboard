import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import UserPage from './pages/UserPage';
import DragDropPage from './pages/DragDropPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/upload",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "upload",
        element: <UploadPage />,
      },
      {
        path: "dragdrop",
        element: <DragDropPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router; 