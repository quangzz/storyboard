import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import DragDropPage from "./pages/DragDropPage";
import SceneEditPage from "./pages/SceneEditPage";
import { SceneProvider } from "./context/SceneContext";

const App = () => {
  return (
    <SceneProvider>
      <Router>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/drag-drop" element={<DragDropPage />} />
          <Route path="/scene/:sceneId" element={<SceneEditPage />} />
        </Routes>
      </Router>
    </SceneProvider>
  );
};

export default App;
