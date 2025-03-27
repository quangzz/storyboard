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
    <div className="home-container">
      <Sidebar
        projects={projects}
        activeProject={activeProject}
        onProjectClick={handleProjectClick}
      />

      <div className="main-content">
        <div className="content-header">
          <h1>My Projects</h1>
        </div>
        
        <button className="new-project-button" onClick={handleCreateProject}>
          Create New Project
        </button>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 