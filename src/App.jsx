import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import StoryboardList from "./components/StoryboardList";
import DragDropPage from "./pages/DragDropPage";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold text-center">AI Storyboard Generator</h1>

        {/* Navigation */}
        <nav className="mt-4 flex gap-4">
          <Link to="/" className="text-blue-500">Home</Link>
          <Link to="/drag-drop" className="text-blue-500">Drag & Drop</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drag-drop" element={<DragDropPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Trang chính hiển thị form tạo storyboard
const HomePage = () => {
  const [images, setImages] = React.useState([]);

  const handleNewImage = (url) => {
    setImages([...images, url]);
  };

  return (
    <div>
      <UploadForm onNewImage={handleNewImage} />
      <StoryboardList images={images} setImages={setImages} />
    </div>
  );
};

export default App;
