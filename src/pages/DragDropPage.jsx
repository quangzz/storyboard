import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const DragDropPage = () => {
  const [scenes, setScenes] = useState([
    { id: "1", img: "https://placehold.co/300x200?text=Scene+1", title: "Scene 1" },
    { id: "2", img: "https://placehold.co/300x200?text=Scene+2", title: "Scene 2" },
    { id: "3", img: "https://placehold.co/300x200?text=Scene+3", title: "Scene 3" },
    { id: "4", img: "https://placehold.co/300x200?text=Scene+4", title: "Scene 4" },
  ]);

  // Hàm xử lý kéo-thả
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedScenes = Array.from(scenes);
    const [movedScene] = reorderedScenes.splice(result.source.index, 1);
    reorderedScenes.splice(result.destination.index, 0, movedScene);

    setScenes(reorderedScenes);
  };

  // Hàm thêm cảnh mới
  const handleAddScene = () => {
    const newScene = {
      id: Date.now().toString(),
      img: "https://placehold.co/300x200?text=New+Scene",
      title: `Scene ${scenes.length + 1}`
    };
    setScenes([...scenes, newScene]);
  };

  // Hàm xóa cảnh
  const handleDeleteScene = (id) => {
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-5 text-center">🎬 Storyboard Scenes</h2>

      {/* Nút thêm cảnh */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 mx-auto mb-5"
        onClick={handleAddScene}
      >
        <AiOutlinePlus /> Add Scene
      </button>

      {/* Kéo-thả cảnh */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="scenes" direction="vertical">
          {(provided) => (
            <div
              className="space-y-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {scenes.map((scene, index) => (
                <Draggable key={scene.id} draggableId={scene.id} index={index}>
                  {(provided) => (
                    <div
                      className="relative border rounded p-2 bg-white shadow-md flex items-center gap-4"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img src={scene.img} alt={scene.title} className="w-32 h-auto rounded" />
                      <p className="font-bold text-lg">{scene.title}</p>
                      <button
                        className="absolute right-2 text-red-500"
                        onClick={() => handleDeleteScene(scene.id)}
                      >
                        <AiOutlineDelete size={20} />
                      </button>
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
  );
};

export default DragDropPage;
