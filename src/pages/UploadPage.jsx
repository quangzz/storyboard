import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUpload } from 'react-icons/ai';

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      // Xử lý upload file ở đây
      setIsUploaded(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8">Upload Script</h1>
        
        {!isUploaded ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <AiOutlineUpload className="mx-auto text-4xl text-gray-400 mb-4" />
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".txt,.doc,.docx"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-purple-600 hover:text-purple-700"
              >
                Click to upload
              </label>
              <p className="text-gray-500 mt-2">or drag and drop</p>
              <p className="text-sm text-gray-400 mt-2">TXT, DOC, DOCX up to 10MB</p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file}
              className={`w-full py-3 rounded-lg text-white ${
                file ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Upload
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-green-500 text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold">Upload Successful!</h2>
            <p className="text-gray-600">Your script has been uploaded successfully.</p>
            <button
              onClick={() => navigate('/drag-drop')}
              className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700"
            >
              Go to Storyboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
