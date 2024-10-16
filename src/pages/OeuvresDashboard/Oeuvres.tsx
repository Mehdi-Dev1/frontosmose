import React, { useEffect, useState } from 'react';
import OeuvreModal from '../../components/OeuvreModal'; // Assurez-vous que ce chemin est correct

interface Oeuvre {
    idWorks: number;
    name: string;
    description: string;
    pictures: string[]; // Cette propriété doit être incluse
    idArtist: number | null;
}

const Oeuvres: React.FC = () => {
    const [oeuvres, setOeuvres] = useState<Oeuvre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedOeuvre, setSelectedOeuvre] = useState<Oeuvre | null>(null);

    const fetchOeuvres = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token manquant, veuillez vous connecter.');
            }

            const response = await fetch('http://localhost:8889/api/oeuvres/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la récupération des œuvres');
            }

            const data: Oeuvre[] = await response.json();
            setOeuvres(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOeuvres();
    }, []);

    const handleOpenEditModal = (oeuvre: Oeuvre) => {
        setSelectedOeuvre(oeuvre);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedOeuvre(null);
    };

    const handleUpdateOeuvre = (updatedOeuvre: Oeuvre) => {
        setOeuvres((prevOeuvres) =>
            prevOeuvres.map((oeuvre) =>
                oeuvre.idWorks === updatedOeuvre.idWorks ? updatedOeuvre : oeuvre
            )
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {oeuvres.map((oeuvre) => (
                    <div
                        key={oeuvre.idWorks}
                        className="border border-gray-300 rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center"
                    >
                        <div className="relative h-64 w-64 mb-2">
                            <img
                                src={`http://localhost:8889/uploads/${oeuvre.pictures[0]}`}
                                alt={oeuvre.name}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-center">{oeuvre.name}</h3>
                        <p className="text-gray-700 mb-4 text-center">{oeuvre.description}</p>
                        <div className="flex space-x-2 mt-auto">
                            <button
                                className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
                                onClick={() => handleOpenEditModal(oeuvre)} // Ouvrir la modale d'édition
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedOeuvre && (
                <OeuvreModal
                    isOpen={isEditModalOpen}
                    onRequestClose={handleCloseEditModal}
                    oeuvre={selectedOeuvre}
                    onUpdate={handleUpdateOeuvre} // Passer la fonction de mise à jour
                />
            )}
        </div>
    );
};

export default Oeuvres;
