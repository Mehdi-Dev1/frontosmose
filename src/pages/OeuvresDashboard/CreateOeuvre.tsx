import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useForm, useFieldArray } from 'react-hook-form';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import Textarea from '../../components/textarea/Textarea';
import SelectInput from '../../components/selectinput/SelectInput';
import BtnSubmit from '../../components/btnsubmit/BtnSubmit';

const CreateOeuve: React.FC = () => {
  const authHeader = useAuthHeader();
  const navigate = useNavigate()
  interface FormData {
    name: string;
    iscreatedat: string;
    files: { file: FileList | null }[];
    message: string; 
  }
  type Artist = {
    value:number;
    label:string ;
}
const [options ,setOptions] = useState<Artist[]>([])
  useEffect(()=>{
    selectInpitArtist();
  },[])
  const {  control, register, formState: { errors }, handleSubmit } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'files',
  });

  const [selectedOption, setSelectedOption] = useState<string | number>('');

const selectInpitArtist = async() =>{
  try {
    const response = await fetch("http://localhost:8889/api/artist/listing-for-selectInput", {
      method: "GET",
    })
    if(response.ok){
      const data = await response.json();
      setOptions(data); 
    }
    
  } catch (error) {
    console.log(error);
  }
}

  const [numberOfFile, setNumberOfFile] = useState(0);

  const onSubmit = async (data: FormData) => {

    const artist = document.getElementById('artist');
    let isArtist = "";
    if (artist) {
      isArtist = (artist as HTMLInputElement).value;
    }

    const formData = new window.FormData();
    formData.append("name", data.name);
      formData.append("isCreatedAt", data.iscreatedat);
      formData.append("idArtist", isArtist);
      formData.append("description", data.message);
    data.files.forEach((fileWrapper, index) => {
      if (fileWrapper && fileWrapper.file && fileWrapper.file.length > 0) {
        formData.append(`image`, fileWrapper.file[index]);
      } else {
        console.warn(`File at index ${index} is empty or invalid`);
      }
    });

    try {
      const response = await fetch("http://localhost:8889/api/oeuvres/admin/create", {
        method: "POST",
        headers: {
          'Authorization': `${authHeader}`,
        },
        body: formData,
      })
      if(response.ok){
        navigate("/dashboard")
      } else {
        //affichage message erreur
        console.log("Error in response");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createFile = () => {
    append({ file: null });
    setNumberOfFile(numberOfFile + 1);
  };

  const removeFile = (index: number) => {
    remove(index);
    setNumberOfFile(numberOfFile - 1);
  };
  const [text, setText] = useState("");
  const handleOnChange =(e:any)=>{
    setText(e.target.value)
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">la page pour crée une oeuvre</h1>
      <Link to="/dashboard">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          retour dashboard
        </button>
      </Link>
      <form id='form' onSubmit={handleSubmit(onSubmit)} >
        <div className='flex justify-between'>

        
        <Input
          type="text"
          name="name"
          label="Nom de l'oeuvre"
          errors={errors}
          register={register}
          validationSchema={{
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: {
              value: /^[A-Za-z 0-9]{2,50}$/,
              message: "Le format du nom  de l'oeuvre  est invalide."
            }
          }}
          id='name'
          value=""
          messRequired="Le nom est obligatoire."
          messMinLength='Le minimum est 2 caractères.'
          messMaxLength='Le maximum est 50 caractères.'
          messPattern='Erreur dans le nom'
          messMax="Valeur trop élevée."
          messMin="Valeur trop basse."
          messValidate="Validation incorrecte."
          onchange={() => { }}
          container_input='h-20'
          required
          classe="border rounded px-3 py-2"
          labelcss=""
        />
        <Input
          type="date"
          name="iscreatedat"
          label="Date de création"
          errors={errors}
          register={register}
          validationSchema={{
            required: true,
          }}
          id='iscreatedat'
          value=""
          messRequired="La date est obligatoire."
          messMinLength='Le minimum est 2 caractères.'
          messMaxLength='Le maximum est 50 caractères.'
          messPattern='Erreur dans le nom'
          messMax="Valeur trop élevée."
          messMin="Valeur trop basse."
          messValidate="Validation incorrecte."
          onchange={() => { }}
          container_input='container_mobile'
          required
          classe="border rounded px-3 py-2"
          labelcss=""
        />
        </div>
        <SelectInput
          label="Nom de l'artiste *"
          options={options}
          defaultValue={selectedOption}
          name="artist"
          validationSchema={{
            required: true,
          }}
          register={register}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        />
        <Textarea
          label="Description"
          onChange={handleOnChange }
          name="message"
          register={register}
          validationSchema={{
            required: 'Ce champ est obligatoire',
            minLength: {
              value: 10,
              message: 'Le message doit contenir au moins 10 caractères',
            },
            maxLength: {
              value: 200,
              message: 'Le message ne doit pas dépasser 200 caractères',
            },
          }}
          errors={errors}
          value=""
          messRequired="Ce champ est obligatoire"
          messMinLength="Le message est trop court"
          messMaxLength="Le message est trop long"
          messPattern=""
          messMax=""
          messMin=""
          messValidate=""
          labelcss="label-class"
          classname="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

        />
        <h3>{numberOfFile}/8 images {numberOfFile < 8 && <button type="button" onClick={createFile}>
          AJOUTER
        </button>}</h3>
        
        {fields.map((field, index) => (
          <div key={field.id}>
            <input  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-60 w-3/4" type="file" {...register(`files.${index}.file`)} />
            <button className="px-4 py-2 bg-slate-950 text-white rounded hover:bg-red-800" type="button" onClick={() => { removeFile(index) }}>
              Remove
            </button>
          </div>
        ))}
        <BtnSubmit container_submit=""
          click={() => { }}
          classe="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-60" id='submit' value='CREER' />
      </form>
    </div>
  );
};

export default CreateOeuve