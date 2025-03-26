import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsChevronLeft, BsPerson, BsUpload, BsSave } from 'react-icons/bs';

const Header = ({ showBack = false, title }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageA, setProfileImageA] = useState(null);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setter(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // TODO: Implement save profile logic
    console.log('Saving profile images:', { profileImage, profileImageA });
  };

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBack && (
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <BsChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Profile Image */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                id="profile-image"
                onChange={(e) => handleImageUpload(e, setProfileImage)}
                className="hidden"
              />
              <label 
                htmlFor="profile-image"
                className="cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BsPerson className="w-6 h-6 text-gray-600" />
                  )}
                </div>
              </label>
            </div>

            {/* Profile Image A */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                id="profile-image-a"
                onChange={(e) => handleImageUpload(e, setProfileImageA)}
                className="hidden"
              />
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
                {profileImageA ? (
                  <img 
                    src={profileImageA} 
                    alt="Profile A" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BsPerson className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <label 
                htmlFor="profile-image-a"
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <BsUpload className="w-4 h-4" />
                <span>Upload</span>
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BsSave className="w-4 h-4" />
              <span>Save</span>
            </button>

            <Link 
              to="/user"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 