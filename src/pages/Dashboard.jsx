import React from 'react';
import Sidebar from '../components/sidebare/Sidebar'; // Assure-toi d'importer le bon chemin

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      {/* Sidebar intégrée avec les liens */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-6 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Bienvenue sur le Dashboard</h1>
        <p>Bienvenue dans votre tableau de bord, utilisez le menu pour naviguer.</p>
      </div>
    </div>
  );
};

export default Dashboard;
