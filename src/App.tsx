// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import Artistes from "./pages/ArtistesDashboard/artist"
import CreateArtist from "./pages/ArtistesDashboard/CreateArtist"
import EditArtist from "./pages/ArtistesDashboard/EditArtist"
import StateArtist from "./pages/ArtistesDashboard/StateArtist"
import Oeuvres from "./pages/OeuvresDashboard/Oeuvres"
import CreateOeuvre from "./pages/OeuvresDashboard/CreateOeuvre"
import EditOeuvre from "./pages/OeuvresDashboard/EditOeuvre"
import StateOeuvre from "./pages/OeuvresDashboard/StateOeuvre"
import Exposition from "./pages/ExpositionDashboard/Exposition"
import CreateExposition from "./pages/ExpositionDashboard/CreateExposition"
import EditExposition from "./pages/ExpositionDashboard/EditExposition"
import StateExposition from "./pages/ExpositionDashboard/StateExposition"

const App: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Vérifie si le token est présent

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />} />
        <Route path="/Artistes" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Artistes />} />} />
        <Route path="/CreateArtist" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<CreateArtist />} />} />
        <Route path="/EditArtist" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EditArtist />} />} />
        <Route path="/StateArtist" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<StateArtist />} />} />
        <Route path="/Oeuvres" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Oeuvres />} />} />
        <Route path="/CreateOeuvre" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<CreateOeuvre />} />} />
        <Route path="/EditOeuvre" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EditOeuvre />} />} />
        <Route path="/StateOeuvre" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<StateOeuvre />} />} />




        <Route path="/Exposition" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Exposition />} />} />
        <Route path="/CreateExposition" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<CreateExposition />} />} />

        <Route path="/EditExposition" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<EditExposition />} />} />

        <Route path="/StateExposition" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<StateExposition />} />} />
      </Routes>
    </Router>
  );
};

export default App;
