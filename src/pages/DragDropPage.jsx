import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight, BsX } from 'react-icons/bs';

const DragDropPage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-4">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-1">AI Storyboard Generator</h1>
        
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
                        <div className="flex justify-center gap-4 mb-1">
                          <span>×</span>
                          <span>⟪</span>
                          <span>⟫</span>
                        </div>

                        {/* Scene Info */}
                        <div className="inline-flex gap-4 text-sm mb-2">
                          <span>SCENE#: {scene.sceneNumber}</span>
                          <span>SHOT#: {scene.shot}</span>
                          <span>TIME#: {scene.time}</span>
                        </div>

                        {/* Scene Frame */}
                        <div className="aspect-[16/9] max-w-2xl mx-auto mb-4 border-2 border-red-500 border-dashed p-4">
                          <div className="w-full h-full border-2 border-red-500 flex items-center justify-center">
                            {/* Placeholder for scene content */}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="max-w-2xl mx-auto mb-2 text-sm">
                          {scene.description}
                        </div>

                        {/* Voice Over */}
                        <div className="max-w-2xl mx-auto text-sm">
                          <div>Voice over</div>
                          <div>{scene.voiceOver}</div>
                        </div>

                        {/* Scene Navigation */}
                        <div className="flex justify-center gap-4 mt-2 mb-4">
                          <span>×</span>
                          <span>⟪</span>
                          <span>⟫</span>
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
