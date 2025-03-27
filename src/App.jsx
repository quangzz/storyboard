import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DragDropPage from "./pages/DragDropPage";
import SceneEditPage from "./pages/SceneEditPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import { SceneProvider } from "./context/SceneContext";

const App = () => {
  return (
    <SceneProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/dragdrop" element={<DragDropPage />} />
            <Route path="/scene/:id" element={<SceneEditPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </SceneProvider>
  );
};

export default App;
