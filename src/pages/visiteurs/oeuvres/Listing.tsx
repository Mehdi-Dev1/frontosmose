import React, { useEffect, useState } from 'react';
import H1visiteur from '../../../components/h1visiteur/H1visiteur';
import OneWorks from '../../../components/oneWork/OneWorks';

const Listing: React.FC = () => {
  // Déclaration de l'interface des oeuvres
  interface Oeuvres {
    idWorks: number; // Ajout d'un ID pour la clé unique
    name: string;
    isCreatedAt: string;
    artiste: string;
    pictures:string;
  }

  // Déclaration de l'état pour stocker les oeuvres
  const [oeuvres, setOeuvres] = useState<Oeuvres[]>([]);

  // Fonction asynchrone pour récupérer la liste des oeuvres
  const listingOeuvre = async () => {
    try {
      const response = await fetch('http://localhost:8889/api/oeuvres/listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idCategories: 1 }),
      });
      if (response.ok) {
        const data = await response.json();
        setOeuvres(data); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listingOeuvre();
  }, []);

  return (
    <div>
      <H1visiteur classNameH1='' val='' />
      {oeuvres.map((oeuvre) => (
        <OneWorks
          key={oeuvre.idWorks} 
          idWorks={oeuvre.idWorks}
          name={oeuvre.name}
    isCreatedAt={oeuvre.isCreatedAt}
    artist={oeuvre.artiste}
    pictures={oeuvre.pictures}
    classNamePictures="w-44"
    classNameContainer="on-works"
    classNameName=""
        />
      ))}
    </div>
  );
};

export default Listing;
