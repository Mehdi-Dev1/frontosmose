import React, { useEffect, useState } from 'react';
import {NavLink, useParams} from "react-router-dom"
import H1visiteur from '../../../components/h1visiteur/H1visiteur';
import OneExposition from '../../../components/oneExposition/OneExposition';

const ListingExposition: React.FC = () => {
  // Déclaration de l'interface des oeuvres
  const {id} =useParams()
  interface Exposition {
    idExposition: number;
    name: string;
    isStartAt: string;
    isFinishAt: string;
    description: string;
    idPriceAdult: string;
    idPriceChild: string;
    idAdmin: number;
    image:string;
    adultPrice:number;
    childPrice:number;
}

  // Déclaration de l'état pour stocker les oeuvres
  const [exposition, setExposition] = useState<Exposition[]>([]);

  // Fonction asynchrone pour récupérer la liste des oeuvres
  const listingExposition = async () => {
    try {
      const response = await fetch('http://localhost:8889/api/expo/listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFinishAt: id }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setExposition(data); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listingExposition();
  }, []);

  return (
    
    <main>
      <H1visiteur 
        containerParti1="w-full flex justify-start   ms-5 " 
        containerParti2="flex w-9/12  justify-start ms-14 "  
        classNameH1 ="h-36"
        part1='EXPOSITIONS'  
        part2={id === "1" ? "A VENIR" : id === "2" ? "PASSEES" : ""}
        rowBottom="rowBottom"
      />
      <article className='flex flex-row justify-around pb-20 flex-wrap'>
        {exposition && exposition.map((e) => {
          const options: Intl.DateTimeFormatOptions = { month: 'long' };
          const startDate = new Date(e.isStartAt);
          const finishDate = new Date(e.isFinishAt);
          const startDay = startDate.getDate(); 
          const startMonth = new Intl.DateTimeFormat('fr-FR', options).format(startDate); 
 
          const startYear = startDate.getFullYear();
          const finishDay = finishDate.getDate(); 
          const finishMonth = new Intl.DateTimeFormat('fr-FR', options).format(finishDate); 
          const finishYear = startDate.getFullYear();
          const debut = `${startDay} ${startMonth} ${startYear}`;
          const fin =  `${finishDay} ${finishMonth} ${finishYear}`;
          let courtDescription = e.description.slice(0,100)
          courtDescription += "...";
          return (
            
            <NavLink to={`/expositions/description/${e.idExposition}`}>
              <OneExposition
                key={e.idExposition}
                idExposition={e.idExposition}
                name={e.name}
                isStartAt={debut}
                isFinishAt={fin}
                description={courtDescription}
                idPriceAdult={e.adultPrice}
                idPriceChild={e.idExposition}
                idAdmin={e.idAdmin}
                image={e.image}
                h1name="h1NameOneExposition"
                classNameContainer="containerOneExposition"
                classNamePictures="imageOneExposition"
                classNameName=""
                dateExposition="dateExposition"
                descriptionOneExposition="descriptionOneExposition"
              />
            </NavLink>
          );
        })}
        {exposition.length ==0 && <p>Il n'y a pas d'exposition.
          </p>}
      </article>
      
    </main>

  );
};

export default ListingExposition;
