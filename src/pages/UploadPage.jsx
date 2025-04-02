import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UploadPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [projectName, setProjectName] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['docx', 'xlsx', 'txt'].includes(fileType)) {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          navigate('/dragdrop');
        }, 2000);
      } else {
        alert('Please upload only .docx, .xlsx, or .txt files');
      }
    }
  };

  const handleUploadComplete = () => {
    // Sau khi upload xong, chuyển đến trang drag-drop
    navigate(`/drag-drop?projectId=${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-[280px]">
        <Header showBack title="Upload" />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              className="px-6 py-2 rounded-lg font-medium bg-purple-100 text-purple-600"
            >
              New
            </button>
            <button
              className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
            >
              Boarder
            </button>
            <button
              className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100"
            >
              History
            </button>
          </div>

          {/* Upload Area */}
          <div className="max-w-[480px] mx-auto">
            {showMessage && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg text-center">
                Đã tải lên thành công
              </div>
            )}

            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Enter project name"
                />
              </div>

              <div className="text-center mb-4">
                <div className="text-sm text-gray-500 mb-2">Version: 16.9</div>
              </div>

              <div>
                <input
                  type="file"
                  id="file-upload"
                  accept=".docx,.xlsx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="block w-full text-center px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
                  style={{
                    backgroundColor: '#4ADE80',
                    color: 'white'
                  }}
                >
                  Create new project with
                  <br />
                  .docx, .xlsx, .txt
                </label>
              </div>
            </div>

            <button 
              onClick={handleUploadComplete}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              Continue to Storyboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
