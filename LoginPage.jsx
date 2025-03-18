import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://your-nodebase-api.com/api/login", {
        username,
        password
      });
      console.log(response.data);
      alert("Login successful!");
    } catch (error) {
      console.error(error);
      alert("Login failed!");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-white text-2xl font-bold mb-6">
          Urah_stb
        </h2>
        <input
          type="text"
          placeholder="Username..."
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 text-white border border-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
