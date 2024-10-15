import React from 'react';
import logo from './logo.png'; // Ensure logo.png is in the src directory
import backgroundImage from './image.png'; // Use the uploaded image

const Osmose = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-70"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-color-1 bg-opacity-40">
        <img src={logo} alt="Osmose Logo" className="mb-4" />
        <h1 className="text-2xl font-bold">ØSMOSE</h1>
        <p className="text-center mt-2">Creative | Artistic | Photographic</p>
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-2 text-white bg-black rounded">Home</button>
          <button className="px-4 py-2 text-black bg-white rounded">About</button>
          <button className="px-4 py-2 text-black bg-white rounded">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default Osmose;
