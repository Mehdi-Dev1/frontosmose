import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

interface Oeuvre {
    idArtist: number;
    name: string;
    artist: string;
    image: string;
    isCreatedAt: string; // If this is a date, you might want to change it to `Date`.
    description: string;
}

const DetailOeuvre: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [oeuvre, setOeuvre] = useState<Oeuvre | null>(null);
  const fetchOeuvre = async () => {
    try {
        const response = await fetch(`http://localhost:8889/api/oeuvres/show`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idWorks: id}),
        });
        const contentType = response.headers.get("Content-Type");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (contentType && contentType.includes("application/json")) {
            const data: Oeuvre = await response.json();
            setOeuvre(data);
        } else {
            throw new Error("Response is not JSON");
        }
    } catch (error) {
      console.error("Error fetching Oeuvre:", error);
    }
  };
  
  useEffect(() => {
    fetchOeuvre();
  }, [id]);

  if (!oeuvre) {
    return(
      <main className="flex flex-col items-center bg-white"></main>
    ) 
  }

  return (
    <main className="flex flex-col items-center bg-white">
    {id}
      <h1 className='h1-description'>DESCRIPTION</h1>
      <img src={oeuvre.image} className="absolute w-56 h-96 top-72" alt={`${oeuvre.name} artwork`} />
      <article className='description flex flex-col items-center'>
        <h1>{oeuvre.name}, {oeuvre.isCreatedAt}</h1>
        <h2>{oeuvre.artist}</h2>
        <p className='textDescription'>{oeuvre.description}</p>
        <NavLink to={`/artistes/decouvrir/${oeuvre.idArtist}`}>Découvrir plus d'oeuvres</NavLink>
      </article>
    </main>
  );
};

export default DetailOeuvre;
