import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

interface ArtistModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (data: FormData) => Promise<void>;
    artist: {
        idArtist: number;
        name: string;
        description: string;
        birthDay: string;
        idCountry: number;
        photo: string;
    };
}

const ArtistModal: React.FC<ArtistModalProps> = ({ isOpen, onRequestClose, onSubmit, artist }) => {
    const { register, handleSubmit, setValue } = useForm();
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

    useEffect(() => {
        setValue('name', artist.name);
        setValue('description', artist.description);
        setValue('birthDay', artist.birthDay.split('T')[0]);
        setValue('idCountry', artist.idCountry);
    }, [artist, setValue]);

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedPhoto(file);
    };

    const onSubmitForm = async (data: any) => {
        const formData = new FormData();
        formData.append('idArtist', artist.idArtist.toString());
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('birthDay', data.birthDay);
        formData.append('idCountry', data.idCountry.toString());

        if (selectedPhoto) {
            formData.append('photo', selectedPhoto);
        }

        await onSubmit(formData);
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            contentLabel="Modifier l'artiste"
            className="flex justify-center items-center h-screen"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Modifier l'artiste</h2>
                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nom</label>
                            <input
                                type="text"
                                {...register('name')}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                {...register('description')}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                            <input
                                type="date"
                                {...register('birthDay')}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">ID Pays</label>
                            <input
                                type="number"
                                {...register('idCountry')}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            {artist.photo && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">Photo actuelle :</p>
                                    <img
                                        src={`http://localhost:8889/uploads/${artist.photo}`}
                                        alt="Current"
                                        className="w-24 h-24 object-cover mt-2 rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                        >
                            Soumettre
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ArtistModal;
