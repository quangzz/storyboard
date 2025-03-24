import React, { useState } from "react";

const UploadPage = () => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/plain"];
    if (!allowedTypes.includes(file.type)) {
      alert("Chỉ chấp nhận file .docx, .xlsx, .txt");
      return;
    }

    setFileName(file.name);
    // TODO: upload logic here
    console.log("Tải lên:", file);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">📂 Create new project with</h2>

      <label className="w-80 bg-green-500 text-white text-center py-4 px-6 rounded-xl cursor-pointer hover:bg-green-600 transition">
        <input type="file" hidden onChange={handleFileChange} />
        {fileName ? `✅ ${fileName}` : "Upload .docx, .xlsx, .txt"}
      </label>

      <p className="mt-3 text-gray-500">Hỗ trợ file: Word (.docx), Excel (.xlsx), Text (.txt)</p>
    </div>
  );
};

export default UploadPage;
