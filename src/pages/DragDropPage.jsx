import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight, BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const DragDropPage = () => {
  const navigate = useNavigate();
  const [scenes, setScenes] = useState([
    { 
      id: "1", 
      sceneNumber: "1.1",
      shot: "Static",
      time: "6",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      voiceOver: "Lorem ipsum dolor sit amet."
    },
    { 
      id: "2", 
      sceneNumber: "1.1",
      shot: "Static",
      time: "5",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      voiceOver: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam"
    }
  ]);

  const [editingScene, setEditingScene] = useState(null);
  const [tempDescription, setTempDescription] = useState("");
  const [tempVoiceOver, setTempVoiceOver] = useState("");

  // Xử lý kéo-thả chính xác
  const handleDragEnd = (result) => {
    if (!result.destination) return; // Nếu kéo ra ngoài thì không làm gì

    const updatedScenes = Array.from(scenes);
    const [movedScene] = updatedScenes.splice(result.source.index, 1);
    updatedScenes.splice(result.destination.index, 0, movedScene);

    setScenes(updatedScenes);
  };

  // Xóa cảnh, giữ ô trống để có thể chèn lại
  const handleDeleteScene = (id) => {
    setScenes(scenes.map(scene => (scene.id === id ? { id, sceneNumber: "", shot: "", time: "", description: "", voiceOver: "" } : scene)));
  };

  // Thêm cảnh mới vào vị trí bất kỳ
  const handleAddScene = () => {
    if (scenes.length >= 20) {
      alert("Tối đa 20 cảnh!");
      return;
    }

    const newScene = {
      id: Date.now().toString(),
      sceneNumber: "",
      shot: "",
      time: "",
      description: "",
      voiceOver: ""
    };
    setScenes([...scenes, newScene]);
  };

  // Handle image change
  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = event.target.result;
        setScenes(scenes.map(scene => (scene.id === id ? { ...scene, image } : scene)));
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
      setScenes(scenes.map(scene => 
        scene.id === id 
          ? { ...scene, audioFile: file.name, audioUrl: audioUrl }
          : scene
      ));
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
    setScenes(scenes.map(scene => 
      scene.id === id 
        ? { ...scene, description: tempDescription, voiceOver: tempVoiceOver }
        : scene
    ));
    setEditingScene(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-4">
        {/* Title */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">AI Storyboard Generator</h1>
          <button 
            onClick={() => navigate('/upload')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Upload Script
          </button>
        </div>
        
        {/* Navigation */}
        <div className="text-center mb-4">
          <a href="#" className="text-purple-600">Home</a>
          <span className="text-purple-600">/</span>
          <a href="#" className="text-purple-600">Storyboard Editor</a>
        </div>

        {/* User Info */}
        <div className="text-center mb-4">
          <div>Minkhoang</div>
          <div className="text-sm text-gray-500">Urah Member</div>
        </div>

        {/* Project */}
        <div className="text-center mb-4">
          <h2 className="font-bold mb-2">Project</h2>
          <div className="mb-2">
            <span>Project_new</span>
            <span className="ml-1">□</span>
          </div>
          <div className="space-y-1 text-sm">
            <div>Script</div>
            <div>Storyboard</div>
            <div>Styleframe</div>
            <div>Project_01</div>
            <div>Project_02</div>
            <div>Project_ongo...</div>
            <div>Project_01(2)</div>
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
            <button className="px-3 py-0.5 border rounded text-sm">History</button>
          </div>
          <div>
            <button className="px-3 py-0.5 border rounded text-sm bg-green-500 text-white">
              Generate ?
            </button>
          </div>
        </div>

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
                        {/* Scene Navigation */}
                        <div className="inline-flex border border-gray-300 mb-1">
                          <button 
                            className="px-2 border-r border-gray-300"
                            onClick={() => handleDeleteScene(scene.id)}
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
                                    onChange={(e) => handleImageChange(e, scene.id)}
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
                              onClick={() => handleEdit(scene)}
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
                              onChange={(e) => handleAudioUpload(e, scene.id)}
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
                                  onClick={() => handleDeleteAudio(scene.id)}
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
                              onClick={() => handleEdit(scene)}
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
                            onClick={() => handleDeleteScene(scene.id)}
                          >×</button>
                          <button className="px-2 border-r border-gray-300">≪</button>
                          <button className="px-2">≫</button>
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
