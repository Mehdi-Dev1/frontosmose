// src/pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">À propos de nous</h1>
      <Link to="/">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Retour à la page d'accueil
        </button>
      </Link>
    </div>
  );
};

export default About;
