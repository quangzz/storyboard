import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { useScenes } from '../context/SceneContext';

const ToggleSwitch = ({ label, isOn, onToggle }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div 
        className="relative w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out"
        onClick={onToggle}
      >
        <div 
          className={`absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5 transition-transform duration-300 ease-in-out shadow-sm
            ${isOn ? 'transform translate-x-5 bg-white' : 'transform translate-x-0'}
          `}
        />
        <div 
          className={`absolute inset-0 rounded-full transition-colors duration-300 ease-in-out
            ${isOn ? 'bg-green-500' : 'bg-gray-300'}
          `}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
};

const SceneEditPage = () => {
  const navigate = useNavigate();
  const { sceneId } = useParams();
  const { getScene, updateScene } = useScenes();
  
  const [sceneData, setSceneData] = useState({
    sceneNumber: '1.3',
    shot: 'Zoom-out',
    shotNote: 'begin',
    time: '6s',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    prompt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
    characterInput: '',
    inpainting: false,
    improvePrompt: false,
    image: null
  });

  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleInputChange = (field, value) => {
    setSceneData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggle = (field) => {
    setSceneData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSceneData(prev => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const maxX = (imageRef.current.width * (zoomLevel - 1)) / 2;
      const maxY = (imageRef.current.height * (zoomLevel - 1)) / 2;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      setPosition({
        x: Math.max(-maxX, Math.min(maxX, newX)),
        y: Math.max(-maxY, Math.min(maxY, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
    if (zoomLevel === 1) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 1));
    if (zoomLevel <= 1.2) {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <BsChevronLeft /> Back
          </button>
          <h1 className="text-2xl font-bold">Scene Edit</h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* Scene Info */}
            <div className="grid grid-cols-3 gap-4 mb-4 border-b pb-4">
              <div>
                <label className="block text-sm font-medium mb-1">SCENE#:</label>
                <input
                  type="text"
                  value={sceneData.sceneNumber}
                  onChange={(e) => handleInputChange('sceneNumber', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">SHOT#:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sceneData.shot}
                    onChange={(e) => handleInputChange('shot', e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={sceneData.shotNote}
                    onChange={(e) => handleInputChange('shotNote', e.target.value)}
                    className="w-24 p-2 border rounded"
                    placeholder="Note"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">TIME#:</label>
                <input
                  type="text"
                  value={sceneData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Scene Frame */}
            <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden bg-gray-50">
              <div className="aspect-[16/9] relative">
                {sceneData.image ? (
                  <div className="relative w-full h-full group overflow-hidden">
                    <div 
                      className="w-full h-full"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      style={{ cursor: zoomLevel > 1 ? 'move' : 'default' }}
                    >
                      <img 
                        ref={imageRef}
                        src={sceneData.image} 
                        alt="Scene preview" 
                        className="w-full h-full object-cover transition-transform duration-200"
                        style={{ 
                          transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                          transformOrigin: 'center'
                        }}
                      />
                    </div>
                    
                    {/* Controls Container - Always visible */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="absolute bottom-4 left-4">
                        <input
                          type="file"
                          accept="image/*"
                          id="scene-image"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label 
                          htmlFor="scene-image"
                          className="cursor-pointer px-4 py-2 bg-white rounded hover:bg-gray-100 transition-colors"
                        >
                          Change Image
                        </label>
                      </div>
                      
                      {/* Zoom Controls - Right side */}
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <button
                          onClick={handleZoomOut}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={zoomLevel <= 1}
                        >
                          <AiOutlineZoomOut className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleZoomIn}
                          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={zoomLevel >= 2}
                        >
                          <AiOutlineZoomIn className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-2">390 x 220</div>
                      <input
                        type="file"
                        accept="image/*"
                        id="scene-image"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label 
                        htmlFor="scene-image"
                        className="cursor-pointer px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        Upload Image
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description:</label>
              <textarea
                value={sceneData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                <BsChevronLeft /> Previous
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Next <BsChevronRight />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Prompting */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Prompting</h2>
              <textarea
                value={sceneData.prompt}
                onChange={(e) => handleInputChange('prompt', e.target.value)}
                className="w-full p-2 border rounded mb-4"
                rows="4"
              />
              <div className="flex flex-col gap-2 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sceneData.inpainting}
                    onChange={() => handleToggle('inpainting')}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>Inpainting</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sceneData.improvePrompt}
                    onChange={() => handleToggle('improvePrompt')}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>Improve Prompt</span>
                </label>
              </div>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Generate
              </button>
            </div>

            {/* Character Input */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Character Input</h2>
              <textarea
                value={sceneData.characterInput}
                onChange={(e) => handleInputChange('characterInput', e.target.value)}
                className="w-full p-2 border rounded mb-4"
                rows="4"
                placeholder="Enter character details..."
              />
              <div className="grid grid-cols-3 gap-4">
                <input type="text" className="p-2 border rounded" placeholder="Input 1" />
                <input type="text" className="p-2 border rounded" placeholder="Input 2" />
                <input type="text" className="p-2 border rounded" placeholder="Input 3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneEditPage; 