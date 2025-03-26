import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useScenes } from '../context/SceneContext';

const Scene = ({ scene, index, onDelete, onEdit, onImageChange, onAudioUpload, onDeleteAudio, editingScene, tempDescription, tempVoiceOver, setTempDescription, setTempVoiceOver, handleSave }) => {
  return (
    <div className="text-center bg-white p-4 rounded-lg">
      {/* Scene Navigation */}
      <div className="inline-flex border border-gray-300 mb-1">
        <button 
          className="px-2 border-r border-gray-300"
          onClick={() => onDelete(scene.id)}
        >×</button>
        <button className="px-2 border-r border-gray-300">≪</button>
        <button className="px-2">≫</button>
      </div>

      {/* Scene Info */}
      <div className="text-center mb-1">
        <div>SCENE#:{scene.sceneNumber}</div>
        <div>SHOT#:{scene.shot}</div>
        <div>TIME#:{scene.time}</div>
      </div>

      {/* Scene Frame */}
      <div className="mx-auto mb-2" style={{ width: '390px' }}>
        <div className="border border-gray-300" style={{ width: '390px', height: '220px' }}>
          {scene.image ? (
            <img 
              src={scene.image} 
              alt={`Scene ${scene.sceneNumber}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-sm mb-2">390 x 220</div>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  id={`file-upload-${scene.id}`}
                  onChange={(e) => onImageChange(e, scene.id)}
                  className="hidden"
                />
                <label 
                  htmlFor={`file-upload-${scene.id}`}
                  className="cursor-pointer px-2 py-1 border border-gray-300 text-sm"
                >
                  Chọn tệp
                </label>
                <span className="ml-2 text-sm text-gray-500">Chưa có tệp nào được chọn</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="text-center mb-2 max-w-[390px] mx-auto">
        {editingScene === scene.id ? (
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            rows="3"
          />
        ) : (
          <div 
            onClick={() => onEdit(scene)}
            className="cursor-pointer hover:bg-gray-50 p-2"
          >
            {scene.description}
          </div>
        )}
      </div>

      {/* Voice Over */}
      <div className="text-center max-w-[390px] mx-auto">
        <div className="text-gray-400">Voice over</div>
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
              className="w-full p-2 border border-gray-300 rounded mb-2"
              rows="2"
              placeholder="Add voice over transcript here..."
            />
            <button
              onClick={() => handleSave(scene.id)}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
          </>
        ) : (
          <div 
            onClick={() => onEdit(scene)}
            className="cursor-pointer hover:bg-gray-50 p-2"
          >
            {scene.voiceOver || "Add voice over transcript..."}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="inline-flex border border-gray-300 mt-2">
        <button 
          className="px-2 border-r border-gray-300"
          onClick={() => onDelete(scene.id)}
        >×</button>
        <button className="px-2 border-r border-gray-300">≪</button>
        <button className="px-2">≫</button>
      </div>
    </div>
  );
};

const DragDropPage = () => {
  const navigate = useNavigate();
  const { scenes, setScenes, deleteScene } = useScenes();

  const [editingScene, setEditingScene] = useState(null);
  const [tempDescription, setTempDescription] = useState("");
  const [tempVoiceOver, setTempVoiceOver] = useState("");

  const [showHistory, setShowHistory] = useState(false);
  const [editHistory, setEditHistory] = useState([]);

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

    setScenes(updatedScenes);
  };

  const handleDeleteScene = (id) => {
    deleteScene(id);
    addToHistory('Delete Scene', `Deleted scene ${id}`);
  };

  // Thêm cảnh mới vào vị trí bất kỳ
  const handleAddScene = () => {
    if (scenes.length >= 20) {
      alert("Tối đa 20 cảnh!");
      return;
    }

    // Tìm số thứ tự lớn nhất hiện tại
    const maxSceneNumber = scenes.reduce((max, scene) => {
      if (!scene.sceneNumber) return max;
      const currentNumber = parseFloat(scene.sceneNumber);
      return currentNumber > max ? currentNumber : max;
    }, 0);

    // Tạo số thứ tự mới (tăng 0.1)
    const newSceneNumber = (maxSceneNumber + 0.1).toFixed(1);

    const newScene = {
      id: Date.now().toString(),
      sceneNumber: newSceneNumber,
      shot: "",
      time: "",
      description: "",
      voiceOver: ""
    };
    setScenes([...scenes, newScene]);
    addToHistory('Add Scene', `Added new scene ${newSceneNumber}`);
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

  return (
    <div className="min-h-screen bg-gray-50">
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
              onClick={handleAddScene}
            >
              New
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Edit History</h2>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <BsX size={24} />
                </button>
              </div>
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
        )}

        {/* Scenes */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="scenes" direction="vertical">
            {(provided) => (
              <div
                className="space-y-8"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {scenes.map((scene, index) => (
                  <Draggable key={scene.id} draggableId={scene.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="text-center bg-white p-4 rounded-lg"
                      >
                        <Scene
                          scene={scene}
                          index={index}
                          onDelete={handleDeleteScene}
                          onEdit={handleEdit}
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
                        <div className="inline-flex border border-gray-300 mb-1">
                          <button 
                            className="px-2 border-r border-gray-300"
                            onClick={() => handleDeleteScene(scene.id)}
                          >×</button>
                          <button className="px-2 border-r border-gray-300">≪</button>
                          <button className="px-2 border-r border-gray-300">≫</button>
                          <button 
                            className="px-2 text-blue-600 hover:bg-blue-50"
                            onClick={() => navigate(`/scene/${scene.id}`)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragDropPage;
