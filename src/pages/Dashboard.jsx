// src/pages/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <p>Bienvenue sur votre tableau de bord !</p>
      {/* Ajouter un bouton pour se déconnecter ici si nécessaire */}
    </div>
  );
};

export default Dashboard;
