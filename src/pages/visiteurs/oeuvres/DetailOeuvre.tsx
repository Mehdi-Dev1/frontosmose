import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

interface Image {
  idPictures: number;
  idWorks: number;
  pictures: string;
}

interface Oeuvre {
  idArtist: number;
  name: string;
  artiste: string;
  pictures: Image[];
  isCreatedAt: string;
  description: string;
}

const DetailOeuvre: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [oeuvres, setOeuvres] = useState<Oeuvre[]>([]);

  const fetchOeuvre = async () => {
    try {
      const response = await fetch(`http://localhost:8889/api/oeuvres/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idWorks: id }),
      });
      const contentType = response.headers.get('Content-Type');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (contentType && contentType.includes('application/json')) {
        const data: Oeuvre[] = await response.json(); // Assume you receive an array
        console.log(data);
        setOeuvres(data); // Set the array of oeuvres
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error fetching Oeuvre:', error);
    }
  };

  useEffect(() => {
    fetchOeuvre();
  }, [id]);

  if (!oeuvres || oeuvres.length === 0) {
    return <main className="flex flex-col items-center bg-white"></main>;
  }
  return (
    <main  >
      <section >
      {oeuvres.map((oeuvre) => (
        <div key={id} className=" flex flex-col items-center ">
          <h1 className="h1-description">DESCRIPTION</h1>

          {oeuvre.pictures && oeuvre.pictures.length > 0 ? (
            oeuvre.pictures.map((imageObject) => (
              <img
                src={`http://localhost:8889/public/uploads/${imageObject.pictures}`} // Ajout d'une base URL si nécessaire
                className="absolute w-56 h-96 top-72"
                alt={`${oeuvre.name} artwork`}
                key={imageObject.idPictures}
              />
            ))
          ) : (
            <p>Aucune image disponible pour cette oeuvre.</p>
          )}

          <article className="textDescriptionOeuvre">
          
          
            <h1 className='h1detailoeuvre'><strong>{oeuvre.name}, {new Date(oeuvre.isCreatedAt).getFullYear()}</strong></h1>
            <h2 className='h2detailoeuvre'>{oeuvre.artiste}</h2>
            <p className="textDescription">{oeuvre.description}</p>
            
            
          </article>
          <article>

          <div className="backgroundLink">
            <NavLink to={`/artistes/decouvrir/${oeuvre.idArtist}`}>
            <div className="linkMoreWorks">Découvrir plus d'oeuvres</div>
            </NavLink>
            </div>
          </article>
        </div>
      ))}
      </section>
    </main>
  );
};

export default DetailOeuvre;
