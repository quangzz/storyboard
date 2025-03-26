import React, { createContext, useState, useContext } from 'react';

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
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
      time: "5",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
      voiceOver: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam"
    }
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

  return (
    <SceneContext.Provider value={{ 
      scenes, 
      setScenes, 
      updateScene, 
      addScene, 
      deleteScene,
      getScene 
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