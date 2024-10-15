import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
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
const OneWorks :React.FC<oneWorksProps>= ({
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
        <img className={classNamePictures} src={`http://localhost:8889/uploads/${pictures[0].pictures}`} alt={name} />
      )}
      <h2 className={classNameName}>{name}, {isCreatedAt}</h2>
      <p className={classNameName}> {artist}</p>
    </div>
  )
}

export default OneWorks
