import React from 'react';
import {  Route } from 'react-router-dom';
import Sidebar from '../components/sidebare/Sidebar'; // Assure-toi d'importer le bon chemin
import Artistes from "./ArtistesDashboard/artist"
// import CreateArtist from "./pages/ArtistesDashboard/CreateArtist"
// import StateExposition from "./pages/ExpositionDashboard/StateExposition"
// import StateArtist from "./pages/ArtistesDashboard/StateArtist"

// import CreateOeuvre from "./pages/OeuvresDashboard/CreateOeuvre"

// import StateOeuvre from "./pages/OeuvresDashboard/StateOeuvre"
// import Exposition from "./pages/ExpositionDashboard/Exposition"
// import CreateExposition from "./pages/ExpositionDashboard/CreateExposition"

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      dffdfd
       {/* <Route path="/Artistes"  element={<Artistes />}  /> */}
        {/* <Route path="/CreateArtist" element={<CreateArtist />} />
        <Route path="/StateArtist"  element={<StateArtist />}  />
        <Route path="/Oeuvres" element={<Oeuvres />} />
        <Route path="/CreateOeuvre" element={<CreateOeuvre />} />
        <Route path="/StateOeuvre" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<StateOeuvre />} />} />
        <Route path="/Exposition" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Exposition />} />} />
        <Route path="/CreateExposition" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<CreateExposition />} />} />
        <Route path="/StateExposition" element={<PrivateRoute isAuthenticated={isAuthenticated} element={<StateExposition />} />} />  */}
      
    </div>
  );
};

export default Dashboard;
