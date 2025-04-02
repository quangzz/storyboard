import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import UserPage from './pages/UserPage';
import DragDropPage from './pages/DragDropPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect mặc định đến trang login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Trang Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Các trang được bảo vệ */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dragdrop" element={<DragDropPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        {/* Redirect các route không hợp lệ về login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
