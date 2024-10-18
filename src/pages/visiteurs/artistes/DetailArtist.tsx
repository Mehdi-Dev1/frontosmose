import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

interface Image {
  idPictures: number;
  idWorks: number;
  pictures: string;
}

interface Artist {
  idArtist: number;
  name: string;
  artiste: string;
  pictures: Image[];
  isCreatedAt: string;
  description: string;
  image :string ;
}

const DetailArtist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist[]>([]);

  const fetchOeuvre = async () => {
    try {
      const response = await fetch(`http://localhost:8889/api/artist/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idArtist: id }),
      });
      const contentType = response.headers.get('Content-Type');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (contentType && contentType.includes('application/json')) {
        const data: Artist[] = await response.json(); // Assume you receive an array
        setArtist(data); // Set the array of oeuvres
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

  if (!artist || artist.length === 0) {
    return <main className="flex flex-col items-center bg-white"></main>;
  }
  return (
    <main  >
      <section >
      {artist.map((a) => (
        <div key={id} className=" flex flex-col items-center relative">
          <h1 className="h1-description">DESCRIPTION</h1>
            <div className='absolute  left-5 top-20 borderImageWorks'>
                <img
                    src={`http://localhost:8889/public/uploads/${a.image}`} // Ajout d'une base URL si nécessaire
                    className="imageWorks"
                    alt={`${a.name} artwork`}
                />
            </div>
            
          {a.pictures && a.pictures.length > 0 ? (
            a.pictures.map((imageObject) => (
                <div className=' absolute  left-20 top-44 borderImageWorks'>
                     <img
                        src={`http://localhost:8889/public/uploads/${imageObject.pictures}`} // Ajout d'une base URL si nécessaire
                        className="w-44 h-64 "
                        alt={`${a.name} artwork`}
                        key={imageObject.idPictures}
                    />
              </div>
            ))
          ) : (
            <p>Aucune image disponible pour cette oeuvre.</p>
          )}

          <article className="textDescriptionArtiste">
          
          
            
            <h1 className='text-xl'><strong>{a.artiste}</strong></h1>
            <p className="textDescription">{a.description}</p>
            
          </article>
          <article className="socialMedia">
            <h1><strong>Suivez la sur ses réseaux</strong></h1>
            <img src="/assets/images/FOOTER.png" alt="social media" />

          </article>
          <article className="divfinish"></article>
        </div>
      ))}
      </section>
    </main>
  );
};

export default DetailArtist;
