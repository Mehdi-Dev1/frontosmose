import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface CreateOeuvreModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (formData: FormData) => Promise<void>;
}

const CreateOeuvreModal: React.FC<CreateOeuvreModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
    const [selectedPictures, setSelectedPictures] = useState<FileList | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    // Effet pour libérer la mémoire pour les URLs des aperçus d'images
    useEffect(() => {
        return () => {
            previewImages.forEach(image => URL.revokeObjectURL(image));
        };
    }, [previewImages]);

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        if (selectedPictures) {
            for (let i = 0; i < selectedPictures.length; i++) {
                formData.append('pictures', selectedPictures[i]);
            }
        }

        await onSubmit(formData);
        onRequestClose();
    };

    const handlePicturesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedPictures(files);

        if (files) {
            const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
            setPreviewImages(fileArray);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            appElement={document.getElementById('root') || undefined} // Assurez-vous que cela pointe vers l'élément racine
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <button onClick={onRequestClose} className="close-button">Fermer</button>
                <h2 className="text-lg font-semibold">Créer une nouvelle œuvre</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">Titre de l'œuvre</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Titre de l'œuvre"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Description de l'œuvre"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="pictures" className="block text-sm font-medium">Ajouter des images</label>
                        <input
                            type="file"
                            name="pictures"
                            id="pictures"
                            accept="image/*"
                            multiple
                            onChange={handlePicturesChange}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md">
                        Créer
                    </button>
                </form>

                {previewImages.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-medium">Aperçu des images :</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {previewImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Aperçu ${index + 1}`}
                                    className="h-20 w-20 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CreateOeuvreModal;
