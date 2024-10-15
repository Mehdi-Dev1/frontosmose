// src/pages/Home.tsx
import React from 'react';
import logo from '../assets/logo.png';
import Layout from '../assets/imglayout.png'; // Adjust as necessary


const Home: React.FC = () => {
  return (
    <div className="bg-color-1 min-h-screen flex flex-col">
      <div className="bg-color-1 h-36 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-32 w-auto" /> {/* Logo size */}
      </div>
      <img src={Layout} alt="Layout" className="h-screen w-full object-fill" /> {/* Full height layout image */}
      <div className="flex flex-col items-center text-center p-6 bg-gray-100">
        <h2 className="text-2xl font-bold my-4">OEUVRE DU MOIS</h2>
        
        <h3 className="text-lg">Thomas Jeunet</h3>
        <p className="mt-2">Découvrir</p>
        <div className="mt-6">
          <h4 className="font-semibold">PEINTURE :</h4>
          <img src={Layout} alt="Artwork" className="w-48 h-auto mx-auto my-2" /> {/* Adjust size as necessary */}
          <p>Acrylique</p>
          <p className="italic">«On the move»</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
