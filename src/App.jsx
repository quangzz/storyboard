import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import DragDropPage from "./pages/DragDropPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/drag-drop" element={<DragDropPage />} />
      </Routes>
    </Router>
  );
};

export default App;
