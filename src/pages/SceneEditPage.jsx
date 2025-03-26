import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight, BsMusicNote } from 'react-icons/bs';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';

const SceneEditPage = () => {
  const navigate = useNavigate();
  const { sceneId } = useParams();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioName, setAudioName] = useState('');

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
      reader.onload = (event) => {
        setSceneData(prev => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setAudioUrl(audioUrl);
      setAudioName(file.name);
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
      const maxX = (imageRef.current?.width * (zoomLevel - 1)) / 2 || 0;
      const maxY = (imageRef.current?.height * (zoomLevel - 1)) / 2 || 0;
      
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
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 1));
    if (zoomLevel <= 1.2) {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Scene Display */}
          <div>
            {/* Scene Header */}
            <div className="grid grid-cols-3 mb-6 text-sm border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
              <div className="p-3 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-bold text-gray-700 mb-1">SCENE#:</div>
                <div className="text-gray-600">{sceneData.sceneNumber}</div>
              </div>
              <div className="p-3 border-r border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="font-bold text-gray-700 mb-1">SHOT#:</div>
                <div className="text-gray-600">{sceneData.shot}</div>
                <div className="text-xs text-gray-500">{sceneData.shotNote}</div>
              </div>
              <div className="p-3 hover:bg-gray-50 transition-colors">
                <div className="font-bold text-gray-700 mb-1">TIME#:</div>
                <div className="text-gray-600">{sceneData.time}</div>
              </div>
            </div>

            {/* Scene Image */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md mb-6 bg-white">
              <div className="aspect-[16/9] bg-gray-50 relative overflow-hidden">
                {sceneData.image ? (
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
                      alt="Scene" 
                      className="w-full h-full object-contain transition-transform duration-300 ease-out"
                      style={{ 
                        transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                        transformOrigin: 'center'
                      }}
                    />

                    {/* Image Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <input
                            type="file"
                            accept="image/*"
                            id="scene-image-change"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <label 
                            htmlFor="scene-image-change"
                            className="cursor-pointer px-4 py-2 bg-white/90 text-gray-700 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 font-medium backdrop-blur-sm"
                          >
                            Change Image
                          </label>

                          <input
                            type="file"
                            accept=".mp3,.wav"
                            id="scene-audio"
                            onChange={handleAudioUpload}
                            className="hidden"
                          />
                          <label 
                            htmlFor="scene-audio"
                            className="cursor-pointer px-4 py-2 bg-white/90 text-gray-700 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200 font-medium backdrop-blur-sm flex items-center gap-2"
                          >
                            <BsMusicNote className="w-5 h-5" />
                            <span>Upload Audio</span>
                          </label>

                          {audioUrl && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100/90 text-purple-700 rounded-lg backdrop-blur-sm">
                              <BsMusicNote className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm truncate max-w-[120px] font-medium">{audioName}</span>
                              <audio controls className="h-8 w-32">
                                <source src={audioUrl} type="audio/mpeg" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={handleZoomOut}
                            className="p-2 bg-white/90 text-gray-700 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                            disabled={zoomLevel <= 1}
                          >
                            <AiOutlineZoomOut className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleZoomIn}
                            className="p-2 bg-white/90 text-gray-700 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                            disabled={zoomLevel >= 2}
                          >
                            <AiOutlineZoomIn className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <div className="text-center space-y-6">
                      <div className="text-sm text-gray-400 font-medium">390 x 220</div>
                      <div className="flex gap-4">
                        <input
                          type="file"
                          accept="image/*"
                          id="scene-image"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label 
                          htmlFor="scene-image"
                          className="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-lg shadow-purple-200 hover:shadow-purple-300"
                        >
                          Upload Image
                        </label>

                        <input
                          type="file"
                          accept=".mp3,.wav"
                          id="scene-audio-initial"
                          onChange={handleAudioUpload}
                          className="hidden"
                        />
                        <label 
                          htmlFor="scene-audio-initial"
                          className="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-lg shadow-purple-200 hover:shadow-purple-300 flex items-center gap-2"
                        >
                          <BsMusicNote className="w-5 h-5" />
                          <span>Upload Audio</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Description textarea */}
              <div className="p-4 border-t border-gray-200">
                <textarea
                  value={sceneData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={4}
                  placeholder="Enter scene description..."
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-lg shadow-purple-200 hover:shadow-purple-300 flex items-center gap-2">
                <BsChevronLeft className="w-5 h-5" /> Back
              </button>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium shadow-lg shadow-purple-200 hover:shadow-purple-300 flex items-center gap-2">
                Next <BsChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Prompting */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Prompting</h2>
              <textarea
                value={sceneData.prompt}
                onChange={(e) => handleInputChange('prompt', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none shadow-sm"
                rows={6}
                placeholder="Enter your prompt..."
              />
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sceneData.inpainting}
                  onChange={(e) => handleInputChange('inpainting', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Inpainting</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sceneData.improvePrompt}
                  onChange={(e) => handleInputChange('improvePrompt', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Improve Prompt</span>
              </label>
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-medium shadow-lg shadow-green-200 hover:shadow-green-300">
                Generate
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-800">Character Input</h2>
              <input
                type="text"
                value={sceneData.characterInput}
                onChange={(e) => handleInputChange('characterInput', e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder="Enter character details..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneEditPage;