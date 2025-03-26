import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft, BsPerson, BsGear, BsBell } from 'react-icons/bs';

const UserPage = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
    role: 'Content Creator'
  });

  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <BsPerson className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <BsGear className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BsBell className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <BsChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold">User Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-32 h-32 rounded-full mb-4 border-4 border-purple-100"
                  />
                  <button className="absolute bottom-4 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700">
                    <BsGear className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.role}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id 
                        ? 'bg-purple-50 text-purple-600' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="bg-white rounded-lg shadow p-6">
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={user.role}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
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
  );
};

export default UserPage; 