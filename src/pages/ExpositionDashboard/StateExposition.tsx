import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">la page pour activer/desactiver expo</h1>
      <Link to="/dashboard">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          retour dashboard
        </button>
      </Link>
    </div>
  );
};

export default About;
