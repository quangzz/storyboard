import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const SceneEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sceneData, setSceneData] = useState({
    sceneNumber: '1.3',
    shot: 'Zoom-out',
    shotNote: 'begin',
    time: '6s',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    prompt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
    inpainting: false,
    improvePrompt: false,
    characterInput: '',
    image: null
  });

  const handleInputChange = (field, value) => {
    setSceneData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSceneData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="scene-editor">
      {/* Left Column */}
      <div>
        {/* Scene Header */}
        <div className="scene-header">
          <div className="scene-header-item">
            <div className="scene-header-label">SCENE#:</div>
            <div>{sceneData.sceneNumber}</div>
          </div>
          <div className="scene-header-item">
            <div className="scene-header-label">SHOT#:</div>
            <div>{sceneData.shot}</div>
            <div className="text-xs text-gray-500">{sceneData.shotNote}</div>
          </div>
          <div className="scene-header-item">
            <div className="scene-header-label">TIME#:</div>
            <div>{sceneData.time}</div>
          </div>
        </div>

        {/* Scene Content */}
        <div className="scene-content">
          <div className="scene-image-container">
            {sceneData.image ? (
              <img 
                src={sceneData.image} 
                alt="Scene" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-4">390 x 220</div>
                <input
                  type="file"
                  accept="image/*"
                  id="scene-image"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label 
                  htmlFor="scene-image"
                  className="nav-button"
                >
                  Upload Image
                </label>
              </div>
            )}
          </div>

          <div className="scene-description">
            <textarea
              value={sceneData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter scene description..."
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="nav-buttons">
          <button className="nav-button">
            <BsChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button className="nav-button">
            Next
            <BsChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="prompting-section">
        <div>
          <h2 className="section-header">Prompting</h2>
          <textarea
            value={sceneData.prompt}
            onChange={(e) => handleInputChange('prompt', e.target.value)}
            className="prompting-textarea"
            placeholder="Enter your prompt..."
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="toggle-container">
            <label className="toggle-label">
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={sceneData.inpainting}
                  onChange={(e) => handleInputChange('inpainting', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </div>
              <span>Inpainting</span>
            </label>

            <label className="toggle-label">
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={sceneData.improvePrompt}
                  onChange={(e) => handleInputChange('improvePrompt', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </div>
              <span>Improve Prompt</span>
            </label>
          </div>

          <button className="generate-button">
            Generate
          </button>
        </div>

        <div>
          <h2 className="section-header">Character Input</h2>
          <input
            type="text"
            value={sceneData.characterInput}
            onChange={(e) => handleInputChange('characterInput', e.target.value)}
            className="character-input"
            placeholder="Enter character details..."
          />
        </div>
      </div>
    </div>
  );
};

export default SceneEditPage;