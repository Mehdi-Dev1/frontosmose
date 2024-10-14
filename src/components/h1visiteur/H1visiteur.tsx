import React from 'react'
interface h1Props {
    val:string;
    classNameH1:string;
}
const H1visiteur:React.FC<h1Props> = ({val, classNameH1}) => {
  return (
    <div >
      <h1 className={classNameH1}>{val}</h1>
    </div>
  )
}

export default H1visiteur
