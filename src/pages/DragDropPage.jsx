import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineDelete, AiOutlineFileAdd } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight, BsX, BsPlus, BsChevronDown, BsGripVertical, BsFolder } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useScenes } from '../context/SceneContext';
import Header from '../components/Header';
import '../styles/DragDrop.css';

const Scene = ({ scene, index, onDelete, onEdit, onImageChange, onAudioUpload, onDeleteAudio, editingScene, tempDescription, tempVoiceOver, setTempDescription, setTempVoiceOver, handleSave }) => {
  const [showShotOptions, setShowShotOptions] = useState(false);

  const shotOptions = [
    'Static',
    'Zoom-out ►',
    'Zoom-in ►',
    'Zoom-out end'
  ];

  const handleShotChange = (newShot) => {
    onEdit(scene.id, 'shot', newShot);
    setShowShotOptions(false);
  };

  return (
    <div className="scene-card">
      <div className="scene-header">
        <div className="scene-controls">
          <button 
            className="scene-control-button"
            onClick={() => onDelete(scene.id)}
          >×</button>
          <button className="scene-control-button">≪</button>
          <button className="scene-control-button">≫</button>
        </div>
        <div className="drag-handle">
          <BsGripVertical />
        </div>
      </div>

      <div className="scene-info">
        <div className="scene-info-item">
          <div className="scene-info-label">SCENE#:</div>
          <div>{scene.sceneNumber}</div>
        </div>
        <div className="scene-info-item">
          <div className="scene-info-label">SHOT#:</div>
          <div className="shot-dropdown-container">
            <button 
              className="shot-button"
              onClick={() => setShowShotOptions(!showShotOptions)}
            >
              {scene.shot || 'Static'}
            </button>
            {showShotOptions && (
              <div className="shot-options">
                {shotOptions.map((option) => (
                  <button
                    key={option}
                    className={`shot-option ${scene.shot === option ? 'active' : ''}`}
                    onClick={() => handleShotChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="scene-info-item">
          <div className="scene-info-label">TIME#:</div>
          <div>{scene.time}</div>
        </div>
      </div>

      <div className="scene-frame">
        {scene.image ? (
          <img 
            src={scene.image} 
            alt={`Scene ${scene.sceneNumber}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="upload-placeholder">
            <div>390 x 220</div>
            <input
              type="file"
              accept="image/*"
              id={`file-upload-${scene.id}`}
              onChange={(e) => onImageChange(e, scene.id)}
              className="hidden"
            />
            <label 
              htmlFor={`file-upload-${scene.id}`}
              className="upload-button"
            >
              Upload Image
            </label>
          </div>
        )}
      </div>

      <div className="scene-description">
        {editingScene === scene.id ? (
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="description-textarea"
            rows="3"
          />
        ) : (
          <div onClick={() => onEdit(scene)}>
            {scene.description}
          </div>
        )}
      </div>

      <div className="voice-over">
        <div className="voice-over-label">Voice over</div>
        <div className="mb-2">
          <input
            type="file"
            accept=".mp3,.wav"
            id={`audio-upload-${scene.id}`}
            onChange={(e) => onAudioUpload(e, scene.id)}
            className="hidden"
          />
          <label 
            htmlFor={`audio-upload-${scene.id}`}
            className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block mb-2"
          >
            {scene.audioFile ? 'Replace Audio' : 'Upload Audio'}
          </label>
          {scene.audioFile && (
            <div className="flex items-center justify-center gap-2">
              <div className="text-sm text-gray-600">
                {scene.audioFile}
              </div>
              <button
                onClick={() => onDeleteAudio(scene.id)}
                className="text-red-500 hover:text-red-700"
              >
                <AiOutlineDelete size={18} />
              </button>
            </div>
          )}
        </div>
        {scene.audioUrl && (
          <audio controls className="w-full mb-2">
            <source src={scene.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {editingScene === scene.id ? (
          <>
            <textarea
              value={tempVoiceOver}
              onChange={(e) => setTempVoiceOver(e.target.value)}
              className="voice-over-textarea"
              rows="2"
              placeholder="Add voice over transcript here..."
            />
            <button
              onClick={() => handleSave(scene.id)}
              className="save-button"
            >
              Save
            </button>
          </>
        ) : (
          <div onClick={() => onEdit(scene)}>
            {scene.voiceOver || "Add voice over transcript..."}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyScenePlaceholder = ({ onClick, index }) => (
  <div className="scene-placeholder" onClick={onClick}>
    <AiOutlineFileAdd className="scene-placeholder-icon" />
    <div className="scene-placeholder-text">
      Click to add scene #{index + 1}
    </div>
  </div>
);

const DragDropPage = () => {
  const navigate = useNavigate();
  const { scenes, setScenes, deleteScene } = useScenes();

  const [editingScene, setEditingScene] = useState(null);
  const [tempDescription, setTempDescription] = useState("");
  const [tempVoiceOver, setTempVoiceOver] = useState("");

  const [showHistory, setShowHistory] = useState(false);
  const [editHistory, setEditHistory] = useState([]);
  const [deletedSceneIndexes, setDeletedSceneIndexes] = useState([]);

  // Thêm vào lịch sử mỗi khi có thay đổi
  const addToHistory = (action, details) => {
    const timestamp = new Date().toLocaleString();
    setEditHistory(prev => [{
      timestamp,
      action,
      details
    }, ...prev]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedScenes = Array.from(scenes);
    const [movedScene] = updatedScenes.splice(result.source.index, 1);
    updatedScenes.splice(result.destination.index, 0, movedScene);

    // Update scene numbers
    const updatedItems = updatedScenes.map((item, index) => ({
      ...item,
      sceneNumber: (index + 1).toFixed(1)
    }));

    setScenes(updatedItems);
    addToHistory('Reorder Scene', `Reordered scene ${movedScene.sceneNumber}`);
  };

  const handleDeleteScene = (id) => {
    const sceneIndex = scenes.findIndex(scene => scene.id === id);
    setDeletedSceneIndexes(prev => [...prev, sceneIndex]);
    deleteScene(id);
    addToHistory('Delete Scene', `Deleted scene ${id}`);
  };

  // Thêm cảnh mới vào vị trí được chọn
  const handleAddScene = (targetIndex = null) => {
    if (scenes.length >= 20) {
      alert("Maximum 20 scenes allowed!");
      return;
    }

    const newScene = {
      id: Math.random().toString(36).substr(2, 9),
      sceneNumber: ((targetIndex !== null ? targetIndex : scenes.length) + 1).toFixed(1),
      shot: 'Static',
      time: '6',
      description: '',
      voiceOver: ''
    };

    if (targetIndex !== null) {
      // Thêm cảnh mới vào vị trí của ô trống
      const updatedScenes = [...scenes];
      updatedScenes.splice(targetIndex, 0, newScene);
      
      // Cập nhật số thứ tự của các cảnh
      const reorderedScenes = updatedScenes.map((scene, index) => ({
        ...scene,
        sceneNumber: (index + 1).toFixed(1)
      }));

      setScenes(reorderedScenes);
      // Xóa index này khỏi danh sách các ô trống
      setDeletedSceneIndexes(prev => prev.filter(index => index !== targetIndex));
    } else {
      // Thêm cảnh mới vào cuối nếu không có vị trí cụ thể
      setScenes([...scenes, newScene]);
    }

    addToHistory('Add Scene', `Added new scene ${newScene.sceneNumber}`);
  };

  // Handle image change
  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target.result;
        setScenes(scenes.map(scene => {
          if (scene.id === id) {
            addToHistory('Update Image', `Updated image for scene ${scene.sceneNumber || id}`);
            return { ...scene, image };
          }
          return scene;
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "audio/mpeg" && file.type !== "audio/wav") {
        alert("Please upload only MP3 or WAV files");
        return;
      }
      
      const audioUrl = URL.createObjectURL(file);
      setScenes(scenes.map(scene => {
        if (scene.id === id) {
          addToHistory('Upload Audio', `Uploaded audio "${file.name}" for scene ${scene.sceneNumber || id}`);
          return { ...scene, audioFile: file.name, audioUrl: audioUrl };
        }
        return scene;
      }));
    }
  };

  const handleDeleteAudio = (id) => {
    setScenes(scenes.map(scene => 
      scene.id === id 
        ? { ...scene, audioFile: null, audioUrl: null }
        : scene
    ));
  };

  const handleEdit = (scene) => {
    setEditingScene(scene.id);
    setTempDescription(scene.description);
    setTempVoiceOver(scene.voiceOver);
  };

  const handleSave = (id) => {
    setScenes(scenes.map(scene => {
      if (scene.id === id) {
        addToHistory('Update Text', `Updated description/voice over for scene ${scene.sceneNumber || id}`);
        return { ...scene, description: tempDescription, voiceOver: tempVoiceOver };
      }
      return scene;
    }));
    setEditingScene(null);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData('text/plain');
    if (sourceId === targetId) return;

    const newScenes = [...scenes];
    const sourceIndex = newScenes.findIndex(scene => scene.id === sourceId);
    const targetIndex = newScenes.findIndex(scene => scene.id === targetId);

    const [movedScene] = newScenes.splice(sourceIndex, 1);
    newScenes.splice(targetIndex, 0, movedScene);

    setScenes(newScenes);
  };

  const handleShotChange = (sceneId, newShot) => {
    setScenes(prevScenes => 
      prevScenes.map(scene => 
        scene.id === sceneId 
          ? { ...scene, shot: newShot }
          : scene
      )
    );
    addToHistory('Update Shot', `Changed shot to ${newShot}`);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <div className="user-avatar"></div>
          <div>
            <div className="user-name">Minkhoang</div>
            <div className="user-role">Urah Member</div>
          </div>
        </div>

        <div className="project-section">
          <div className="project-header">Project</div>
          <div className="project-dropdown">
            <span>Project_new</span>
            <BsChevronDown />
          </div>

          <div className="project-submenu">
            <div className="submenu-item">Script</div>
            <div className="submenu-item active">Storyboard</div>
            <div className="submenu-item">Styleframe</div>
          </div>

          <div className="project-list">
            <div className="project-item">
              <BsChevronRight className="icon" />
              <span>Project_01</span>
            </div>
            <div className="project-item">
              <BsChevronRight className="icon" />
              <span>Project_02</span>
            </div>
            <div className="project-item">
              <BsChevronRight className="icon" />
              <span>Project_ongo...</span>
            </div>
            <div className="project-item">
              <BsChevronRight className="icon" />
              <span>Project_01(2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Header title="Storyboard Generator" />
        <div className="max-w-4xl mx-auto py-4">
          {/* Header Menu */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Home
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Storyboard
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Styleframe
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Script
                </button>
                <button 
                  onClick={() => navigate(`/scene/${scenes[0]?.id || 'new'}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Scene Editor
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-medium">Minkhoang</div>
                  <div className="text-sm text-gray-500">Urah Member</div>
                </div>
                <button 
                  onClick={() => navigate('/upload')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Upload Script
                </button>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-lg">Project</h2>
                <div className="text-gray-600">Project_new</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Last saved: 2 minutes ago</div>
                <div className="text-sm text-gray-500">Version: 1.0</div>
              </div>
            </div>
          </div>

          {/* Generator Controls */}
          <div className="text-center mb-6">
            <div className="font-bold mb-2">AI Storyboard Generator</div>
            <div className="inline-flex gap-1 mb-2">
              <button 
                className="px-3 py-0.5 border rounded text-sm hover:bg-gray-100"
                onClick={() => handleAddScene()}
              >
                <BsPlus className="w-5 h-5" />
                <span>New Scene</span>
              </button>
              <button className="px-3 py-0.5 border rounded text-sm bg-blue-100">Boarder</button>
              <button 
                className="px-3 py-0.5 border rounded text-sm hover:bg-gray-100"
                onClick={() => setShowHistory(true)}
              >
                History
              </button>
            </div>
            <div>
              <button className="px-3 py-0.5 border rounded text-sm bg-green-500 text-white">
                Generate ?
              </button>
            </div>
          </div>

          {/* History Modal */}
          {showHistory && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Edit History</h2>
                  <button 
                    onClick={() => setShowHistory(false)}
                    className="modal-close"
                  >
                    <BsX />
                  </button>
                </div>
                <div className="modal-body">
                  <div className="space-y-2">
                    {editHistory.map((entry, index) => (
                      <div key={index} className="border-b pb-2">
                        <div className="text-sm text-gray-500">{entry.timestamp}</div>
                        <div className="font-medium">{entry.action}</div>
                        <div className="text-gray-600">{entry.details}</div>
                      </div>
                    ))}
                    {editHistory.length === 0 && (
                      <div className="text-center text-gray-500 py-4">
                        No edit history yet
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Scenes */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="scenes" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className="scenes-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {scenes.map((scene, index) => (
                    <Draggable 
                      key={scene.id} 
                      draggableId={scene.id} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`scene-wrapper ${snapshot.isDragging ? 'is-dragging' : ''}`}
                        >
                          {deletedSceneIndexes.includes(index) ? (
                            <EmptyScenePlaceholder 
                              onClick={() => handleAddScene(index)} 
                              index={index}
                            />
                          ) : (
                            <Scene
                              scene={scene}
                              index={index}
                              onDelete={handleDeleteScene}
                              onEdit={(sceneId, field, value) => {
                                if (field === 'shot') {
                                  handleShotChange(sceneId, value);
                                } else {
                                  setScenes(prevScenes =>
                                    prevScenes.map(scene =>
                                      scene.id === sceneId
                                        ? { ...scene, [field]: value }
                                        : scene
                                    )
                                  );
                                }
                              }}
                              onImageChange={handleImageChange}
                              onAudioUpload={handleAudioUpload}
                              onDeleteAudio={handleDeleteAudio}
                              editingScene={editingScene}
                              tempDescription={tempDescription}
                              tempVoiceOver={tempVoiceOver}
                              setTempDescription={setTempDescription}
                              setTempVoiceOver={setTempVoiceOver}
                              handleSave={handleSave}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {scenes.length === 0 && (
                    <EmptyScenePlaceholder onClick={() => handleAddScene()} index={0} />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default DragDropPage;
