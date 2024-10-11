import React from "react"

type InputProps = {
    id:string;
    name: string;
    label:string ;
   register:any; 
   errors:any; 
   required:any, 
   type:string;
   validationSchema:any;
   container_input:string;
   classe:string;
  value:string;
  messRequired:string;
  messMinLength:string;
  messMaxLength:string;
  messPattern:string;
  messMax:string;
  messMin:string;
  messValidate:string;
  onchange:any;
  labelcss:string;
    
  }
const Input : React.FC<InputProps> = ({
    id, 
  name, 
  label,
   register, 
   errors, 
   required, 
   type,
   validationSchema ,
   container_input, 
   classe,
  value,
  messRequired,
  messMinLength,
  messMaxLength,
  messPattern,
  messMax,
  messMin,
  messValidate,
  onchange,
  labelcss

}) => {

  return (
    <div className={container_input}>
      <label className={labelcss}htmlFor={name}>
      {label}
      {required && "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className={classe}
      defaultValue={value}
      {...register(name, validationSchema)}
       
    />
  <div>
     {errors && errors[name]?.type === 'required' && <div className="error">{messRequired}</div>}
      {errors && errors[name]?.type === 'minLength' && <div className="error">{messMinLength}</div>}
      {errors && errors[name]?.type === 'maxLength' && <div className="error">{messMaxLength}</div>}
      {errors && errors[name]?.type === 'pattern' && <div className="error">{messPattern}</div>}
      {errors && errors[name]?.type === 'max' && <p className="error">{messMax}</p>}
      {errors && errors[name]?.type === 'min' && <div className="error">{messMin}</div>}
      {errors && errors[name]?.type === 'validate' && <div className="error">{messValidate}</div>}
    </div></div>
  );
}

export default Input;


// export default Input