import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsHouse, BsFolder } from 'react-icons/bs';
import { useUser } from '../contexts/UserContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleUserClick = () => {
    navigate('/user');
  };

  return (
    <div className="fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-200 p-6">
      {/* User Info */}
      <div 
        className="flex items-center gap-3 mb-8 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleUserClick}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#7662AB]"></div>
          )}
        </div>
        <div>
          <h2 className="font-medium text-gray-900">{user?.name || 'User'}</h2>
          <p className="text-sm text-gray-500">{user?.role || 'Member'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-6">
        <Link to="/home" className="flex items-center gap-3 text-gray-500 hover:text-gray-900">
          <BsHouse />
          <span>Home</span>
        </Link>

        {/* Projects Section */}
        <div>
          <h3 className="uppercase text-xs font-medium text-gray-400 mb-4">PROJECTS</h3>
          <div className="space-y-3">
            <Link to="/project/alpha" className="flex items-center justify-between text-gray-500 hover:text-gray-900">
              <div className="flex items-center gap-3">
                <BsFolder />
                <span>Project Alpha</span>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
            <Link to="/project/beta" className="flex items-center justify-between text-gray-500 hover:text-gray-900">
              <div className="flex items-center gap-3">
                <BsFolder />
                <span>Project Beta</span>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
            <Link to="/project/gamma" className="flex items-center justify-between text-gray-500 hover:text-gray-900">
              <div className="flex items-center gap-3">
                <BsFolder />
                <span>Project Gamma</span>
              </div>
              <span className="text-gray-400">›</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 