import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from '../pages/UserPage';
import UploadPage from '../pages/UploadPage';
import DragDropPage from '../pages/DragDropPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/upload" replace />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/dragdrop" element={<DragDropPage />} />
      <Route path="/home" element={<Navigate to="/upload" replace />} />
      <Route path="/project/:id" element={<DragDropPage />} />
    </Routes>
  );
};

export default AppRoutes; 