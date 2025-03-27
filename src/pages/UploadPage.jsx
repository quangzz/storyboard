import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/Upload.css';

const UploadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectName, setProjectName] = useState('');
  const [activeTab, setActiveTab] = useState('New');
  const [showMessage, setShowMessage] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra định dạng file
      const fileType = file.type;
      const validTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain'];
      
      if (!validTypes.includes(fileType)) {
        alert('Please upload only .docx, .xlsx, or .txt files');
        return;
      }

      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/dragdrop');
      }, 2000);
    }
  };

  return (
    <div className="upload-container">
      <Sidebar />
      
      <div className="main-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'New' ? 'active' : ''}`}
            onClick={() => setActiveTab('New')}
          >
            New
          </button>
          <button 
            className={`tab ${activeTab === 'Boarder' ? 'active' : ''}`}
            onClick={() => setActiveTab('Boarder')}
          >
            Boarder
          </button>
          <button 
            className={`tab ${activeTab === 'History' ? 'active' : ''}`}
            onClick={() => setActiveTab('History')}
          >
            History
          </button>
        </div>

        <div className="upload-content">
          <div className="project-input">
            <input
              type="text"
              placeholder="projectname..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className="version">16.9</div>
          </div>

          {showMessage && (
            <div className="success-message">
              Đã tải lên thành công
            </div>
          )}

          <button 
            className="create-project-button"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept='.docx,.xlsx,.txt';
              input.onchange = handleFileUpload;
              input.click();
            }}
          >
            Create new project with<br/>.docx, .xlsx, .txt
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
