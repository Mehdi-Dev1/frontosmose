// src/App.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import "./App.css"
const App: React.FC = () => {
  return (   
    <><Link to='/login'>login</Link>
    <Outlet/>
    </>
  );
};

export default App;
