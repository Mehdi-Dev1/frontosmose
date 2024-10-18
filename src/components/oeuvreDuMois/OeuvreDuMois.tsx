import React, { useState } from 'react'

interface oneWorksProps{
    idWorks: number; // Ajout d'un ID pour la clé unique
    name: string;
    isCreatedAt: string;
    artist: string;
    pictures:any,
    classNamePictures:string ;
    classNameContainer:string;
    classNameName:string;
}
const OeuvreDuMois :React.FC<oneWorksProps>= ({
    idWorks,
    name,
    isCreatedAt,
    artist,
    pictures,
    classNamePictures ,
    classNameContainer,
    classNameName
}) => {

  return (
    <div className={classNameContainer}>
      {pictures.length > 0 && (
        <img className={classNamePictures} src={`http://localhost:8889/public/uploads/${pictures[0].pictures}`} alt={name} />
      )}
      <div className="paragrapheOeuvreDuMois">
        <p className="categorieOeuvre">PEINTURE</p>
        <p className={classNameName}>«{name} »</p>
      </div>
    </div>
  )
}

export default OeuvreDuMois
