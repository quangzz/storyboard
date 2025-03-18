import React, { useState } from "react";

const UploadForm = ({ onNewImage }) => {
  const [description, setDescription] = useState("");

  const handleGenerate = () => {
    if (!description.trim()) return alert("Please enter a description!");
    onNewImage(`https://placehold.co/150x100?text=${description}`);
    setDescription("");
  };

  return (
    <div className="p-5 bg-gray-100 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-3">Generate Storyboard</h2>
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Enter scene description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleGenerate}
      >
        Generate
      </button>
    </div>
  );
};

export default UploadForm;
