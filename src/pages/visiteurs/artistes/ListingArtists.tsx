import React, { useEffect, useState } from 'react';
import {NavLink} from "react-router-dom"
import H1visiteur from '../../../components/h1visiteur/H1visiteur';

import OneArtist from '../../../components/oneArtist/OneArtist';

const ListingArtists: React.FC = () => {
  // Déclaration de l'interface des oeuvres
  interface Artists {
    idArtist: number; // Ajout d'un ID pour la clé unique
    nameArtist: string;
    image:string;
    country: string;
  }

  // Déclaration de l'état pour stocker les oeuvres
  const [artist, setArtist] = useState<Artists[]>([]);

  // Fonction asynchrone pour récupérer la liste des oeuvres
  const listingArtists = async () => {
    try {
      const response = await fetch('http://localhost:8889/api/artist/listing', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setArtist(data); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listingArtists();
  }, []);

  return (
    
    <main>
      <H1visiteur 
        containerParti1="w-full flex justify-start   ms-5 " 
        containerParti2="flex w-9/12  justify-start ms-14 "  
        classNameH1 ="h-36"
        part1='LES'  
        part2="ARTISTES"
        rowBottom="rowBottom"
      />
      <article className='flex flex-row justify-around pb-20 flex-wrap'>
        {artist.map((a) => {
          return (
            <NavLink key={a.idArtist} to={`/artistes/description/${a.idArtist}`}>
               <OneArtist
                key={a.idArtist} 
                idArtist={a.idArtist}
                name={a.nameArtist}
                image={a.image}
                country={a.country}
                classNamePictures="w-32 h-36 mt-2"
                classNameContainer="backGround w-36 h-60 flex  flex-col items-center mt-10 "
                classNameName="on-works m-2"
              /> 
            </NavLink>
          );
        })}
      </article>
      
    </main>

  );
};

export default ListingArtists;
