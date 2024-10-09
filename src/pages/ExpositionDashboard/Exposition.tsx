import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Les Expositions</h1>
      <Link to="/createexposition">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Crée une expo
        </button>
      </Link>
      <Link to="/editexposition">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          modif expo
        </button>
      </Link>
      <Link to="/stateexposition">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          activer/desactive expo
        </button>
      </Link>
    </div>
  );
};

export default About;
