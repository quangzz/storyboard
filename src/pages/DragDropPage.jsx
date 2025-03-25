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
      sceneNumber: "1.2",
      shot: "Static",
      time: "4",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      voiceOver: ""
    },
    { 
      id: "3", 
      sceneNumber: "1.3",
      shot: "Static",
      time: "5",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      voiceOver: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam"
    }
  ]);

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
    if (scenes.length >= 9) {
      alert("Tối đa 9 cảnh!");
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
            <button className="px-3 py-0.5 border rounded text-sm">New</button>
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
                className="space-y-6"
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
                        className="text-center"
                      >
                        {/* Scene Navigation */}
                        <div className="flex gap-1 mb-2 border w-fit">
                          <button className="px-2 py-1 hover:bg-gray-100">×</button>
                          <button className="px-2 py-1 hover:bg-gray-100">≪</button>
                          <button className="px-2 py-1 hover:bg-gray-100">≫</button>
                        </div>

                        {/* Scene Info */}
                        <div className="flex border mb-2">
                          <div className="flex-1 border-r px-2 py-1 flex items-center">
                            <span className="font-bold mr-1">SCENE#:</span>
                            <span>{scene.sceneNumber}</span>
                          </div>
                          <div className="flex-1 border-r px-2 py-1 flex items-center">
                            <span className="font-bold mr-1">SHOT#:</span>
                            <span>{scene.shot}</span>
                          </div>
                          <div className="flex-1 px-2 py-1 flex items-center">
                            <span className="font-bold mr-1">TIME#:</span>
                            <span>{scene.time}</span>
                          </div>
                        </div>

                        {/* Scene Frame */}
                        <div className="border border-blue-500 mb-2 mx-auto" style={{ width: '390px' }}>
                          <div className="relative" style={{ width: '390px', height: '220px' }}>
                            {scene.image ? (
                              <img 
                                src={scene.image} 
                                alt={`Scene ${scene.sceneNumber}`}
                                className="w-full h-full object-cover"
                                style={{ width: '390px', height: '220px' }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 cursor-pointer"
                                   onClick={() => document.getElementById(`image-upload-${scene.id}`).click()}>
                                390 x 220
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id={`image-upload-${scene.id}`}
                              onChange={(e) => handleImageChange(e, scene.id)}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="text-left mb-2 px-2">
                          {scene.description}
                        </div>

                        {/* Voice Over */}
                        <div className="border mt-2 p-2 text-left">
                          <div className="text-gray-400 mb-1">Voice over</div>
                          <div>{scene.voiceOver}</div>
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
