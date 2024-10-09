// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Bienvenue sur la page d'accueil !</h1>
      <Link to="/about">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Aller à la page À propos
        </button>
      </Link>

      <Link to="/login">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Home;
