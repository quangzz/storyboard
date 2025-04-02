import React, { createContext, useState, useContext } from 'react';

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [scenes, setScenes] = useState([
    { sceneNumber: '1.1', time: 5 },
    { sceneNumber: '1.2', time: 5 }
  ]);

  const updateScene = (id, newData) => {
    setScenes(scenes.map(scene => 
      scene.id === id ? { ...scene, ...newData } : scene
    ));
  };

  const addScene = (newScene) => {
    setScenes([...scenes, newScene]);
  };

  const deleteScene = (id) => {
    setScenes(scenes.filter(scene => scene.id !== id));
  };

  const getScene = (id) => {
    return scenes.find(scene => scene.id === id);
  };

  const getAllScenes = () => {
    return scenes;
  };

  const moveScene = (fromIndex, toIndex) => {
    setScenes(prev => {
      const newScenes = [...prev];
      const [removed] = newScenes.splice(fromIndex, 1);
      newScenes.splice(toIndex, 0, removed);
      return newScenes;
    });
  };

  return (
    <SceneContext.Provider value={{ 
      scenes, 
      setScenes,
      updateScene, 
      addScene, 
      deleteScene,
      getScene,
      getAllScenes,
      moveScene
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