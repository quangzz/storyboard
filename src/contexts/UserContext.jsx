import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Minkhoang',
    role: 'User Member',
    avatar: null
  });

  const updateUser = (updates) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  const value = {
    user,
    updateUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 