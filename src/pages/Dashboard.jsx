import React from 'react';
import {Link } from 'react-router-dom';
import Sidebar from '../components/sidebare/Sidebar'; // Assure-toi d'importer le bon chemin


const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar/>
      dffdfd<Link to="/Artistes">Profile</Link>
    </div>
  );
};

export default Dashboard;
