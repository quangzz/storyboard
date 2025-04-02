import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { BsFolder, BsChevronRight, BsThreeDotsVertical } from 'react-icons/bs';
import '../styles/Home.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-left">
        <div className="project-icon">
          <BsFolder />
        </div>
        <div className="project-info">
          <h3>{project.name}</h3>
          <p>Last modified: {project.lastModified}</p>
          <span className={`project-status ${project.hasFiles ? 'has-files' : 'no-files'}`}>
            {project.hasFiles ? 'Ready to edit' : 'Upload files'}
          </span>
        </div>
      </div>
      <button className="project-menu" onClick={(e) => e.stopPropagation()}>
        <BsThreeDotsVertical />
      </button>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Project Alpha',
      hasFiles: true,
      lastModified: '2024-03-27',
      subItems: ['Scene 1', 'Scene 2', 'Scene 3']
    },
    {
      id: 2,
      name: 'Project Beta',
      hasFiles: true,
      lastModified: '2024-03-26',
      subItems: ['Scene 1', 'Scene 2']
    },
    {
      id: 3,
      name: 'Project Gamma',
      hasFiles: false,
      lastModified: '2024-03-25'
    }
  ]);

  const handleProjectClick = (project) => {
    setActiveProject(project.id);
    if (project.hasFiles) {
      navigate('/dragdrop');
    } else {
      navigate('/upload');
    }
  };

  const handleCreateProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `Project_${projects.length + 1}`,
      hasFiles: false,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setProjects([newProject, ...projects]);
    navigate('/upload', { state: { project: newProject } });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Projects</h1>
        <button 
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          onClick={() => navigate('/upload')}
        >
          Create New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate('/upload')}
          >
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          </div>
        ))}

        {/* Add Project Card */}
        <div 
          className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors cursor-pointer flex items-center justify-center h-[200px]"
          onClick={() => navigate('/upload')}
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mx-auto mb-2">
              +
            </div>
            <span className="text-gray-600">Create New Project</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 