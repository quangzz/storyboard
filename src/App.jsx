import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DragDropPage from "./pages/DragDropPage";
import SceneEditPage from "./pages/SceneEditPage";
import UserPage from "./pages/UserPage";
import { SceneProvider } from "./context/SceneContext";

const App = () => {
  return (
    <SceneProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            <Route path="/" element={<DragDropPage />} />
            <Route path="/drag-drop" element={<DragDropPage />} />
            <Route path="/scene/:id" element={<SceneEditPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </div>
      </Router>
    </SceneProvider>
  );
};

export default App;
