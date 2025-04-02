import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';

const projects = [
  {
    id: 'alpha',
    name: 'Project Alpha',
    createdAt: 'April 1, 2024',
    progress: 45,
    dueDate: 'May 8',
  },
  {
    id: 'beta',
    name: 'Project Beta',
    createdAt: 'April 2, 2024',
    progress: 30,
    dueDate: 'May 15',
  },
  {
    id: 'gamma',
    name: 'Project Gamma',
    createdAt: 'April 3, 2024',
    progress: 60,
    dueDate: 'May 20',
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleCreateNewProject = () => {
    const newProjectId = `project-${Date.now()}`;
    navigate(`/upload?projectId=${newProjectId}`);
  };

  const handleProjectClick = (projectId) => {
    navigate(`/dragdrop?projectId=${projectId}`);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 min-w-[250px] border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-gray-50 py-4 z-10">
          <h1 className="text-2xl font-semibold text-gray-800">My Projects</h1>
          <button
            onClick={handleCreateNewProject}
            className="flex items-center gap-2 px-6 py-2 bg-[#7C3AED] text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span className="text-xl">+</span>
            Create New Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">Created on {project.createdAt}</p>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => e.stopPropagation()} // Chặn click lan xuống thẻ cha
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{project.progress}% completed</p>
              </div>

              <p className="text-sm text-gray-600 mt-2">Due {project.dueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
