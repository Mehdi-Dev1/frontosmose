import React from 'react'
interface BtnSubmitProps {
  container_submit: string;
  click : any;
  classe : string;
  id:string;
  value:string;
}
const BtnSubmit: React.FC<BtnSubmitProps> = (props) => {

  return (
    <div className={props.container_submit}>
        <input onClick={props.click} className={props.classe}  type='submit' id={props.id} value={props.value} />
    </div>
  )
}

export default BtnSubmit