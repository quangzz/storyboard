import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      {/* User Profile */}
      <div 
        onClick={() => navigate('/user')}
        className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
      >
        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center">
          {user?.name?.[0] || 'M'}
        </div>
        <div>
          <div className="font-medium">{user?.name || 'Minkhoang'}</div>
          <div className="text-sm text-gray-500">{user?.role || 'User Member'}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-4">
        <Link 
          to="/dashboard"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            location.pathname === '/dashboard' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>Home</span>
        </Link>

        {/* Projects Section */}
        <div>
          <div className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            PROJECTS
          </div>
          <div className="mt-2 space-y-1">
            {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project) => (
              <Link
                key={project}
                to={`/project/${project.toLowerCase().replace(' ', '-')}`}
                className={`flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md ${
                  location.pathname.includes(project.toLowerCase().replace(' ', '-')) 
                    ? 'bg-gray-200' 
                    : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" 
                    />
                  </svg>
                  <span>{project}</span>
                </div>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar; 