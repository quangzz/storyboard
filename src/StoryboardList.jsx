import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const StoryboardList = ({ images, setImages }) => {
  
  const handleDragEnd = (result) => {
    if (!result.destination) return; // Nếu không kéo đến vị trí hợp lệ thì không làm gì

    const newImages = Array.from(images);
    const [movedItem] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, movedItem);

    setImages(newImages); // Cập nhật danh sách ảnh mới
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="storyboard-list" direction="horizontal">
        {(provided) => (
          <div
            className="flex gap-4 overflow-x-auto p-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((img, index) => (
              <Draggable key={img} draggableId={img} index={index}>
                {(provided) => (
                  <div
                    className="border rounded p-2 bg-white shadow-md"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img src={img} alt={`Storyboard ${index}`} className="w-40 h-auto" />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default StoryboardList;
