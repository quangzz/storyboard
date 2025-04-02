import React, { createContext, useState, useContext } from 'react';

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [scenes, setScenes] = useState([
    {
      id: '1',
      sceneNumber: '1.1',
      shot: 'Close-up',
      shotNote: 'start',
      time: '3s',
      description: 'Initial scene description',
      prompt: 'Initial prompt',
      characterInput: '',
      inpainting: false,
      improvePrompt: false,
      image: null
    },
    // Add more initial scenes if needed
  ]);

  const getScene = (id) => {
    return scenes.find(scene => scene.id === id) || null;
  };

  const getAllScenes = () => {
    return scenes;
  };

  const updateScene = (id, newData) => {
    setScenes(prevScenes => 
      prevScenes.map(scene => 
        scene.id === id ? { ...scene, ...newData } : scene
      )
    );
  };

  const addScene = (newScene) => {
    setScenes(prevScenes => [...prevScenes, newScene]);
  };

  const deleteScene = (id) => {
    setScenes(prevScenes => prevScenes.filter(scene => scene.id !== id));
  };

  return (
    <SceneContext.Provider value={{
      scenes,
      getScene,
      getAllScenes,
      updateScene,
      addScene,
      deleteScene
    }}>
      {children}
    </SceneContext.Provider>
  );
};

export const useScenes = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScenes must be used within a SceneProvider');
  }
  return context;
};

export default SceneContext;