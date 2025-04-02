import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { SceneProvider } from './contexts/SceneContext';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <UserProvider>
        <SceneProvider>
          <AppRoutes />
        </SceneProvider>
      </UserProvider>
    </Router>
  );
}

export default App;