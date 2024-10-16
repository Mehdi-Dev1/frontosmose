// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'; // Logo statique
import Layout from '../assets/imglayout.png'; // Image de mise en page statique

interface Artwork {
  artist_name: string;
  painting_name: string;
  pictures: string[];
}

const Home: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]); // Changement ici pour un tableau d'œuvres

  // Fetch the featured artwork data
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('http://localhost:8889/api/oeuvres/featured'); // Remplacer par l'URL de l'API
        const data: Artwork[] = await response.json(); // S'assurer de spécifier le type
        setArtworks(data); // Stocker l'ensemble des œuvres
        console.log(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="bg-color-1 min-h-screen flex flex-col">
      <div className="bg-color-1 h-36 flex items-center justify-center">
        <img src={logo} alt="Logo" className="h-32 w-auto" /> {/* Taille du logo */}
      </div>
      <img src={Layout} alt="Layout" className="h-screen w-full object-fill" /> {/* Image de mise en page pleine hauteur */}
      
      <div className="flex p-6 bg-color-2">
        {/* Vérifier si les œuvres sont chargées */}
        {artworks.length > 0 ? (
          artworks.map((artwork, index) => (
            <div key={index} className="mt-6">
              <h3 className="text-lg font-thin">____  {artwork.artist_name}</h3>
              <h2 className="text-2xl font-bold pl-4">OEUVRES DU MOIS</h2>
              <p className="px-40">Découvrir____</p>
              
              {/* Ajouter un espace ici */}
              <div className="my-4" /> {/* Espace de 1 rem en haut et en bas */}

              {/* Conteneur flex pour l'image et le texte */}
              <div className="flex items-start"> {/* Alignement flex */}
                {/* Afficher la première image de l'œuvre */}
                {artwork.pictures.length > 0 && (
                  <img
                    src={`http://localhost:8889/uploads/${artwork.pictures[0]}`} // Construction de l'URL de l'image
                    alt={artwork.painting_name}
                    className="w-72 h-auto mx-6"
                  />
                )}
                
                <div className=" mt-16" style={{ height: '33%', display: 'flex', alignItems: 'flex-start' }}> {/* Ajustement de la position verticale */}
                  <h4 className="text-2xl font-bold">Oeuvre : </h4>
                  <p className="ml-1">"{artwork.painting_name}"</p> {/* Espace entre le titre et le nom de l'œuvre */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Chargement des œuvres...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
