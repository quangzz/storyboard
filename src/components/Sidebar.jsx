import React from 'react';
import { BsHouseDoor, BsFolder, BsChevronRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Project = ({ project, isActive, onClick }) => {
  return (
    <div className={`project-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <BsFolder />
      <span>{project.name}</span>
      {project.subItems && <BsChevronRight className="project-arrow" />}
    </div>
  );
};

const Sidebar = ({ projects, activeProject, onProjectClick }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleUserClick = () => {
    navigate('/user');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="user-info" onClick={handleUserClick}>
          <div className="user-avatar"></div>
          <div>
            <div className="user-name">Minkhoang</div>
            <div className="user-role">Urah Member</div>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="nav-item" onClick={handleHomeClick}>
            <BsHouseDoor />
            <span>Home</span>
          </div>
        </div>
      </div>

      <div className="project-section">
        <div className="project-header">Projects</div>
        {projects?.map((project) => (
          <div key={project.id}>
            <Project
              project={project}
              isActive={activeProject === project.id}
              onClick={() => onProjectClick(project)}
            />
            {activeProject === project.id && project.subItems && (
              <div className="sub-items">
                {project.subItems.map((item, index) => (
                  <div key={index} className="sub-item">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 