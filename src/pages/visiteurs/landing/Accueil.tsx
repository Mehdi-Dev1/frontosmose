import React, { useState, useEffect } from 'react';
import OeuvreDuMois from '../../../components/oeuvreDuMois/OeuvreDuMois';

const Accueil: React.FC = () => {
  interface Oeuvres {
    idWorks: number;
    name: string;
    isCreatedAt: string;
    artiste: string;
    pictures: string;
  }

  const [oeuvres, setOeuvres] = useState<Oeuvres[]>();

  const  oeuvreDuMois= async () => {
    try {
      const response = await fetch('http://localhost:8889/api/oeuvres/works-month', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
    oeuvreDuMois();
  }, []);

  const extractYear = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <main>
    <article className='articleOeuvreDuMois'>
        {oeuvres && <>
            <div className="h1-oeuvre-du-mois"> 
                <div className="nameoeuvredumois">
                    <div className="trait"></div>{oeuvres[0].artiste}</div>
                <div className="oeuvredumois">OEUVRE DU MOIS</div>
                <div className="decouvrir">Découvrir<div className="trait"></div></div> 
            </div>
          <OeuvreDuMois
            key={oeuvres[0].idWorks}
            idWorks={oeuvres[0].idWorks}
            name={oeuvres[0].name}
            isCreatedAt="" // Extraire l'année
            artist=""
            pictures={oeuvres[0].pictures}
            classNamePictures="w-36  mt-2"
            classNameContainer="w-80 flex justify-center items-center "
            classNameName="nameOeuvre"
          />
          </>
        }

        </article>
    </main>
  );
};

export default Accueil;
