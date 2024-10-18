import React from 'react'
interface Exposition {
    idExposition: number;
    name: string;
    isStartAt: string;
    isFinishAt: string;
    description: string;
    idPriceAdult: number;
    idPriceChild: number;
    idAdmin: number;
    image:string;
    classNameContainer:string;
    classNamePictures:string;
    classNameName:string,
    h1name:string;
    dateExposition:string;
    descriptionOneExposition:string ;

}
const OneExposition :React.FC <Exposition>= ({
        idExposition,
        name,
        isStartAt,
        isFinishAt,
        description,
        idPriceAdult,
        idPriceChild,
        idAdmin,
        image,
        classNameContainer,
        classNamePictures,
        classNameName,
        h1name,
        dateExposition,
        descriptionOneExposition
    }) => {
    
  return (
    <div className={classNameContainer}>
      <img className={classNamePictures} src={`http://localhost:8889/public/uploads/${image}`} alt={name} />
      
      <h1 className={h1name}><strong>{name}</strong></h1>
      <p className={dateExposition}>{isStartAt} au {isFinishAt}</p>
      <p className={descriptionOneExposition}>{description} </p>
    </div>
  )
}

export default OneExposition
