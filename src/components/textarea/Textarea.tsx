import React from 'react';
import { FieldErrors } from 'react-hook-form';

type TextareaProps = {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register: any; // Should come from react-hook-form's useForm
  validationSchema: object;
  errors: FieldErrors<any>;
  value: string;
  messRequired: string;
  messMinLength: string;
  messMaxLength: string;
  messPattern: string;
  messMax: string;
  messMin: string;
  messValidate: string;
  labelcss: string;
  classname: string;
};

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  onChange,
  register,
  validationSchema,
  errors,
  value,
  messRequired,
  messMinLength,
  messMaxLength,
  messPattern,
  messMax,
  messMin,
  messValidate,
  labelcss,
  classname
}) => {
  return (
    <>
      <label className={labelcss}>{label}</label>
      <div className={classname}>
        <textarea
          id={name}
          {...register(name, validationSchema)}
        />
        {errors[name]?.type === 'required' && <div className="error">{messRequired}</div>}
        {errors[name]?.type === 'minLength' && <div className="error">{messMinLength}</div>}
        {errors[name]?.type === 'maxLength' && <div className="error">{messMaxLength}</div>}
        {errors[name]?.type === 'pattern' && <div className="error">{messPattern}</div>}
        {errors[name]?.type === 'max' && <div className="error">{messMax}</div>}
        {errors[name]?.type === 'min' && <div className="error">{messMin}</div>}
        {errors[name]?.type === 'validate' && <div className="error">{messValidate}</div>}
      </div>
    </>
  );
};

export default Textarea;
