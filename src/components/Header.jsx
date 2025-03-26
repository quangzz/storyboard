import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsChevronLeft, BsPerson } from 'react-icons/bs';

const Header = ({ showBack = false, title }) => {
  const navigate = useNavigate();

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
          
          <Link 
            to="/user"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BsPerson className="w-5 h-5" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header; 