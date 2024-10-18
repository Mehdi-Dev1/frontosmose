import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

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

const DetailExposition: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [exposition, setExposition] = useState<Exposition[]>([]);

  const fetchExposition = async () => {
    try {
      const response = await fetch(`http://localhost:8889/api/expo/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idExposition: id }),
      });
      const contentType = response.headers.get('Content-Type');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (contentType && contentType.includes('application/json')) {
        const data: Exposition[] = await response.json(); // Assume you receive an array
        setExposition(data); // Set the array of oeuvres
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error fetching Oeuvre:', error);
    }
  };

  useEffect(() => {
    fetchExposition();
  }, [id]);

  if (!exposition || exposition.length === 0) {
    return <main className="flex flex-col items-center bg-white"></main>;
  }
  return (
    <main  >
      <section >
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
          return (
        <div key={id} className=" flex flex-col items-center ">
          <h1 className="h1-description">EXPOSITION</h1>
          <article className="textDescriptionOeuvre">
            <img
                src={`http://localhost:8889/public/uploads/${e.image}`} // Ajout d'une base URL si nécessaire
                className="absolute w-56 h-96 top-72"
                alt={`${e.name} artwork`}
            />   
            <h1 className='h1detailoeuvre'><strong>{e.name}</strong></h1>
            <h2>{debut} au {fin}</h2>
            <p className="textDescription">{e.description}</p>
          </article>
          <article>

          <div className="backgroundLink">
            <NavLink to={`/artistes/decouvrir/${e.idExposition}`}>
            <div className="linkMoreWorks">Plus d'exposition a venir</div>
            </NavLink>
            </div>
          </article>
        </div>
        );
    })}
      </section>
    </main>
  );
};

export default DetailExposition;
