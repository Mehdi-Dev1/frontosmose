import React from 'react'
interface Artists {
    idArtist: number; // Ajout d'un ID pour la clé unique
    name: string;
    image:string;
    country: string;
    classNameContainer:string;
    classNamePictures:string;
    classNameName:string;
  }
const OneArtist  :React.FC<Artists>= ({
    idArtist, 
    name,
    image,
    country,
    classNameContainer,
    classNamePictures,
    classNameName,
}) => {
  return (
    <div>
      <div className={classNameContainer}>
      
        <img className={classNamePictures} src={`http://localhost:8889/uploads/${image}`} alt={name} />
      
      <h2 className={classNameName}>{name}</h2>
      <p className={classNameName}> {country}</p>
    </div>
    </div>
  )
}

export default OneArtist
