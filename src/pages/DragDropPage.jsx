import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { BsX, BsChevronLeft, BsChevronRight, BsChevronDown } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useScenes } from '../contexts/SceneContext';
import { useUser } from '../contexts/UserContext';
import '../styles/DragDrop.css';

const Scene = ({ scene, index, onDelete, onEdit }) => {
  const shotOptions = [
    'Static',
    'Zoom-out ►',
    'Zoom-in ►',
    'Zoom-out end'
  ];

  return (
    <Draggable draggableId={scene.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="scene-card"
        >
          {/* Control Buttons */}
          <div className="scene-controls">
            <button onClick={() => onDelete(scene.id)}>×</button>
            <button>«</button>
            <button>»</button>
          </div>

          {/* Scene Info */}
          <div className="scene-info">
            <div className="scene-info-row">
              <span>SCENE#: {scene.sceneNumber || (index + 1).toFixed(1)}</span>
              <span>SHOT#: 
                <select 
                  value={scene.shot || 'Static'} 
                  onChange={(e) => onEdit(scene.id, 'shot', e.target.value)}
                  className="shot-select"
                >
                  {shotOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </span>
              <span>TIME#: {scene.time || '6'}</span>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="scene-image">
            {scene.image ? (
              <img src={scene.image} alt={`Scene ${index + 1}`} />
            ) : (
              <div className="image-placeholder"></div>
            )}
          </div>

          {/* Description */}
          <div className="scene-description">
            <textarea
              value={scene.description || ''}
              onChange={(e) => onEdit(scene.id, 'description', e.target.value)}
              placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat..."
            />
          </div>

          {/* Voice Over */}
          <div className="voice-over">
            <textarea
              value={scene.voiceOver || ''}
              onChange={(e) => onEdit(scene.id, 'voiceOver', e.target.value)}
              placeholder="Voice over"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

const Sidebar = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [activeSubmenu, setActiveSubmenu] = useState('Storyboard');
  const [expandedProject, setExpandedProject] = useState('Project_new');
  
  const handleProjectClick = (projectName) => {
    if (projectName === expandedProject) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectName);
    }
  };

  const handleSubmenuClick = (item) => {
    setActiveSubmenu(item);
  };

  const handleUserClick = () => {
    navigate('/user');
  };
  
  return (
    <div className="sidebar">
      <div className="user-info" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
        <div className="user-avatar">M</div>
        <div>
          <div className="user-name">Minkhoang</div>
          <div className="user-role">User Member</div>
        </div>
      </div>

      <div className="project-section">
        <div 
          className="project-item home-button"
          onClick={() => navigate('/')}
        >
          <span>Home</span>
        </div>

        <div className="project-header">Project</div>
        <div className="project-list">
          <div 
            className={`project-item ${expandedProject === 'Project_new' ? 'active' : ''}`}
            onClick={() => handleProjectClick('Project_new')}
          >
            <span>Project_new</span>
            <BsChevronDown className={`transform transition-transform ${expandedProject === 'Project_new' ? 'rotate-180' : ''}`} />
          </div>
          
          {expandedProject === 'Project_new' && (
            <div className="project-submenu">
              <div 
                className={`submenu-item ${activeSubmenu === 'Script' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Script')}
              >
                Script
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Storyboard' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Storyboard')}
              >
                Storyboard
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Styleframe' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Styleframe')}
              >
                Styleframe
              </div>
            </div>
          )}

          <div 
            className={`project-item ${expandedProject === 'Project_01' ? 'active' : ''}`}
            onClick={() => handleProjectClick('Project_01')}
          >
            <span>Project_01</span>
            <BsChevronDown className={`transform transition-transform ${expandedProject === 'Project_01' ? 'rotate-180' : ''}`} />
          </div>
          {expandedProject === 'Project_01' && (
            <div className="project-submenu">
              <div 
                className={`submenu-item ${activeSubmenu === 'Script_01' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Script_01')}
              >
                Script
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Storyboard_01' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Storyboard_01')}
              >
                Storyboard
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Styleframe_01' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Styleframe_01')}
              >
                Styleframe
              </div>
            </div>
          )}

          <div 
            className={`project-item ${expandedProject === 'Project_02' ? 'active' : ''}`}
            onClick={() => handleProjectClick('Project_02')}
          >
            <span>Project_02</span>
            <BsChevronDown className={`transform transition-transform ${expandedProject === 'Project_02' ? 'rotate-180' : ''}`} />
          </div>
          {expandedProject === 'Project_02' && (
            <div className="project-submenu">
              <div 
                className={`submenu-item ${activeSubmenu === 'Script_02' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Script_02')}
              >
                Script
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Storyboard_02' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Storyboard_02')}
              >
                Storyboard
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Styleframe_02' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Styleframe_02')}
              >
                Styleframe
              </div>
            </div>
          )}

          <div 
            className={`project-item ${expandedProject === 'Project_6ngay' ? 'active' : ''}`}
            onClick={() => handleProjectClick('Project_6ngay')}
          >
            <span>Project_6ngay...</span>
            <BsChevronDown className={`transform transition-transform ${expandedProject === 'Project_6ngay' ? 'rotate-180' : ''}`} />
          </div>
          {expandedProject === 'Project_6ngay' && (
            <div className="project-submenu">
              <div 
                className={`submenu-item ${activeSubmenu === 'Script_6ngay' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Script_6ngay')}
              >
                Script
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Storyboard_6ngay' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Storyboard_6ngay')}
              >
                Storyboard
              </div>
              <div 
                className={`submenu-item ${activeSubmenu === 'Styleframe_6ngay' ? 'active' : ''}`}
                onClick={() => handleSubmenuClick('Styleframe_6ngay')}
              >
                Styleframe
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DragDropPage = () => {
  const [activeTab, setActiveTab] = useState('New');
  const { scenes } = useScenes();

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'New' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('New')}
          >
            New
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'Boarder' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('Boarder')}
          >
            Boarder
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'History' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('History')}
          >
            History
          </button>
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Generate ►
        </button>
      </div>

      {/* Scenes Grid */}
      <div className="grid grid-cols-2 gap-6">
        {scenes.map((scene, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white">
            {/* Scene Controls */}
            <div className="flex justify-end gap-2 mb-4">
              <button className="p-1">×</button>
              <button className="p-1">«</button>
              <button className="p-1">»</button>
            </div>

            {/* Scene Info */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-500">SCENE#:</label>
                <div>{scene.sceneNumber || `1.${index + 1}`}</div>
              </div>
              <div>
                <label className="text-sm text-gray-500">SHOT#:</label>
                <select className="w-full border rounded">
                  <option>Static</option>
                  <option>Wide Shot</option>
                  <option>Medium Shot</option>
                  <option>Close Up</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-500">TIME#:</label>
                <input 
                  type="number" 
                  className="w-full border rounded"
                  value={scene.time || 5}
                />
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="border-2 border-dashed rounded-lg h-48 mb-4 flex items-center justify-center">
              {scene.image ? (
                <img src={scene.image} alt={`Scene ${index + 1}`} className="max-h-full" />
              ) : (
                <div className="text-gray-400">Click to upload image</div>
              )}
            </div>

            {/* Description */}
            <textarea
              className="w-full border rounded-lg p-2 mb-4"
              rows="3"
              placeholder="Scene description..."
              value={scene.description || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."}
            />

            {/* Voice Over */}
            <textarea
              className="w-full border rounded-lg p-2"
              rows="2"
              placeholder="Voice over..."
              value={scene.voiceOver || "Lorem ipsum dolor sit amet."}
            />
          </div>
        ))}

        {/* Add Scene Button */}
        <div className="border-2 border-dashed rounded-lg h-48 flex items-center justify-center cursor-pointer hover:bg-gray-50">
          + Add Scene
        </div>
      </div>
    </div>
  );
};

export default DragDropPage;
