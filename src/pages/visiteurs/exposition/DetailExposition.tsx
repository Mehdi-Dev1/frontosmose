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
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Ajout de l'état pour gérer les erreurs

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
        setExposition([]); 
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        // Vérifiez si data contient des erreurs
        if (data.errors) {
          setExposition([]);  // ou gérez les erreurs d'une autre manière
          setErrorMessage('Une erreur de validation s\'est produite.'); // Stocke le message d'erreur
          console.error('Erreurs de validation:', data.errors);
          return;
        }

        setExposition(data); // Si aucune erreur, stockez les expositions
        setErrorMessage(null); // Réinitialisez l'erreur si la requête réussit
      } else {
        setExposition([]); 
        setErrorMessage('La réponse du serveur n\'est pas au format JSON.');
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      setExposition([]); 
      setErrorMessage('Erreur lors de la récupération des données.');
      console.error('Error fetching Exposition:', error);
    }
  };

  useEffect(() => {
    fetchExposition();
  }, [id]);

  // Affichage du message d'erreur s'il y a une erreur
  if (errorMessage) {
    return (
      <main className="flex flex-col items-center ">
        <p className="">{errorMessage}</p> {/* Message d'erreur en rouge */}
      </main>
    );
  }

  // Si pas d'exposition et pas d'erreur, afficher un message d'attente
  if (!exposition || exposition.length === 0) {
    return <main className="flex flex-col items-center bg-white">Chargement en cours...</main>;
  }

  return (
    <main>
      <section>
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
        <div key={id} className="flex flex-col items-center">
          <h1 className="h1-description">EXPOSITION</h1>
          <article className="textDescriptionOeuvre">
            <img
              src={`http://localhost:8889/public/uploads/${e.image}`}
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
                <div className="linkMoreWorks">Plus d'expositions à venir</div>
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
