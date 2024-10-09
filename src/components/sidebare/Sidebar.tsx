import React from 'react';
import { Link } from 'react-router-dom';

// Composant Sidebar réutilisable
const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 fixed top-0 left-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
      </div>
      <nav className="mt-10">
        <ul>
          {/* Lien vers Les Artistes */}
          <li className="mb-4">
            <Link 
              to="/artistes" 
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Les Artistes
            </Link>
          </li>

          {/* Lien vers Les Œuvres */}
          <li className="mb-4">
            <Link 
              to="/oeuvres" 
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Les Œuvres
            </Link>
          </li>

          {/* Lien vers Les Expositions */}
          <li className="mb-4">
            <Link 
              to="/exposition" 
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Les Expositions
            </Link>
          </li>

          {/* Lien vers Configurer les Prix */}
          <li className="mb-4">
            <Link 
              to="/configurer-prix" 
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Configurer les Prix
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
