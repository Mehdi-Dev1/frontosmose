import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface Oeuvre {
    idWorks: number;
    name: string;
    description: string;
    pictures: string[]; 
    idArtist: number | null;
}

interface OeuvreModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    oeuvre: Oeuvre | null;
    onUpdate: (updatedOeuvre: Oeuvre) => void;
}

const OeuvreModal: React.FC<OeuvreModalProps> = ({
    isOpen,
    onRequestClose,
    oeuvre,
    onUpdate,
}) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [idArtist, setIdArtist] = useState<number | null>(null);
    const [imageFiles, setImageFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (oeuvre) {
            setName(oeuvre.name);
            setDescription(oeuvre.description);
            setIdArtist(oeuvre.idArtist);
        }
    }, [oeuvre]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('idWorks', String(oeuvre?.idWorks));
        formData.append('name', name);
        formData.append('description', description);
        if (idArtist !== null) {
            formData.append('idArtist', String(idArtist));
        }
        if (imageFiles) {
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('image', imageFiles[i]);
            }
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token manquant, veuillez vous connecter.');
            }

            const response = await fetch('http://localhost:8889/api/oeuvres/edit', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'œuvre');
            }

            const updatedPictures = oeuvre?.pictures || [];
            const updatedOeuvre: Oeuvre = { 
                idWorks: oeuvre!.idWorks, 
                name, 
                description, 
                idArtist, 
                pictures: updatedPictures 
            };

            onUpdate(updatedOeuvre);
            onRequestClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose} 
            contentLabel="Modifier l'œuvre"
            className="flex justify-center items-center h-screen"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Modifier l'œuvre</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID Artiste (optionnel)</label>
                        <input
                            type="number"
                            value={idArtist || ''}
                            onChange={(e) => setIdArtist(e.target.value ? Number(e.target.value) : null)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Images (optionnel)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImageFiles(e.target.files)}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
                        />
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
                            disabled={loading}
                        >
                            {loading ? 'En cours...' : 'Sauvegarder'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default OeuvreModal;
