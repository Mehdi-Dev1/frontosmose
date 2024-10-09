import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Les Oeuvres</h1>
      <Link to="/createoeuvre">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Crée une oeuvre
        </button>
      </Link>
      <Link to="/editoeuvre">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          modif Oeuvres
        </button>
      </Link>
      <Link to="/stateoeuvre">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          activer/desactive Oeuvres
        </button>
      </Link>
    </div>
  );
};

export default About;
