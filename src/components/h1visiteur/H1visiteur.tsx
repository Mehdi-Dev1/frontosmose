import React from 'react'
interface h1Props {
    part1:string;
    part2:string;
    classNameH1:string;
    containerParti1:string;
    containerParti2 : string ;
    rowBottom:string;
}
const H1visiteur:React.FC<h1Props> = ({part1,part2, classNameH1,containerParti1 , containerParti2, rowBottom}) => {
  return (
    <div  className={classNameH1}>
      <h1>
        <div className={containerParti1} >{part1}</div>
        <div className={containerParti2} >{part2}</div>
      </h1>
        <div className={rowBottom}></div>
    </div>
  )
}

export default H1visiteur
