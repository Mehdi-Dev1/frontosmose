// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';

import Login from './pages/Login';

import ProtectedRoute from './components/Routes/ ProtectedRoute';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const App: React.FC = () => {
  const auth = useAuthUser()
  const isAuthenticated = true;  // Remplacer par la logique d'authentification réelle
  const userRole = "admin";  // Récupérer cela depuis ton contexte d'authentification ou JWT

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard"  element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />} />

      </Routes>  


        
    </Router>
  );
};

export default App;
