import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft, BsPerson, BsGear, BsBell, BsCamera } from 'react-icons/bs';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useUser } from '../contexts/UserContext';

const UserPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateUser({
      ...user,
      [name]: value
    });
  };

  const compressImage = (base64String, maxWidth = 400) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        resolve(compressedBase64);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const compressedImage = await compressImage(event.target.result);
        updateUser({
          ...user,
          avatar: compressedImage
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 2000);
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <BsPerson className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <BsGear className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BsBell className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="pl-[280px]">
        <Header showBack title="User Profile" />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-12">
              <div className="bg-white rounded-lg shadow p-6">
                {showSaveMessage && (
                  <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
                    Changes saved successfully!
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                    
                    {/* Avatar Upload Section */}
                    <div className="mb-8 flex flex-col items-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#7662AB]"></div>
                          )}
                        </div>
                        <label 
                          htmlFor="avatar-upload"
                          className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                        >
                          <BsCamera className="w-4 h-4" />
                        </label>
                        <input
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Click the camera icon to upload a new avatar</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={user.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          style={{ border: '2px solid black' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          style={{ border: '2px solid black' }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          value={user.role}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          style={{ border: '2px solid black' }}
                        />
                      </div>

                      <button 
                        onClick={handleSave}
                        className="px-6 py-2 rounded-lg font-medium border transition-all duration-200"
                        style={{
                          backgroundColor: 'white',
                          color: 'rgba(77, 190, 150, 1)',
                          border: '1px solid rgba(77, 190, 150, 1)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#7662AB';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.border = '1px solid #7662AB';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = 'rgba(77, 190, 150, 1)';
                          e.currentTarget.style.border = '1px solid rgba(77, 190, 150, 1)';
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                          Enable
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Manage your email notification preferences</p>
                        </div>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                          Configure
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Delete Account</h4>
                          <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                        </div>
                        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div>
                    <h3 className="text-xl font-bold mb-6">Notifications</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="bg-purple-100 p-3 rounded-full">
                            <BsBell className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Notification Title {i}</h4>
                            <p className="text-sm text-gray-600">This is a sample notification message.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage; 