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
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        <DragDropContext>
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
                        className="text-center"
                      >
                        {/* Scene Navigation */}
                        <div className="inline-flex border border-gray-300 mb-1">
                          <button className="px-2 border-r border-gray-300">×</button>
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
                          {scene.description}
                        </div>

                        {/* Voice Over */}
                        <div className="text-center max-w-[390px] mx-auto">
                          <div className="text-gray-400">Voice over</div>
                          <div>{scene.voiceOver}</div>
                        </div>

                        {/* Bottom Navigation */}
                        <div className="inline-flex border border-gray-300 mt-2">
                          <button className="px-2 border-r border-gray-300">×</button>
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
