import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DragDropPage from "./pages/DragDropPage";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold text-center">AI Storyboard Generator</h1>

        {/* Navigation */}
        <nav className="mt-4 flex gap-4 justify-center">
          <Link to="/" className="text-blue-500">Home</Link>
          <Link to="/drag-drop" className="text-blue-500">Storyboard Editor</Link>
        </nav>

        <Routes>
          <Route path="/drag-drop" element={<DragDropPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
