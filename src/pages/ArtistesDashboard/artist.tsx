import React, { useEffect, useState } from 'react';
import ArtistModal from '../../components/ArtistModal';
import CreateArtistModal from '../../components/CreateArtistModal'; // Importer le composant de création
import { Link } from 'react-router-dom';

interface Artist {
    idArtist: number;
    name: string;
    description: string;
    birthDay: string;
    idCountry: number;
    photo: string;
}

const Artists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    const fetchArtists = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token manquant, veuillez vous connecter.');
            }

            const response = await fetch('http://localhost:8889/api/artist/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la récupération des artistes');
            }

            const data: Artist[] = await response.json();
            console.log(data); // Vérifier les données reçues
            setArtists(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    const filteredArtists = artists.filter(artist =>
        artist.name && artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (artist: Artist) => {
        setSelectedArtist(artist);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedArtist(null);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleEditArtist = async (formData: FormData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token manquant, veuillez vous connecter.');
            return;
        }

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

        try {
            const response = await fetch('http://localhost:8889/api/artist/edit', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la mise à jour de l\'artiste');
            }

            // Recharger la liste des artistes
            await fetchArtists(); // <-- Ajouté ici
            handleCloseModal();
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleCreateArtist = async (formData: FormData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token manquant, veuillez vous connecter.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8889/api/artist/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de la création de l\'artiste');
            }

            // Recharger la liste des artistes
            await fetchArtists(); // <-- Ajouté ici
            handleCloseCreateModal();
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Rechercher par nom d'artiste..."
                    className="p-2 border border-gray-300 rounded w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="ml-4 bg-green-500 text-white rounded py-2 px-4 hover:bg-green-600"
                    onClick={handleOpenCreateModal}
                >
                    Créer un Artiste
                </button>
                <Link to="/DashBoard">
    <button className="ml-4 bg-sky-600 text-white rounded py-2 px-4 hover:bg-sky-800">
        Retour menu
    </button>
</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredArtists.map((artist) => (
                    <div
                        key={artist.idArtist}
                        className="border border-gray-300 rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center"
                    >
                        <div className="relative h-64 w-64 mb-2">
                            <img
                                src={`http://localhost:8889/uploads/${artist.photo}`}
                                alt={artist.name}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-center">{artist.name}</h3>
                        <p className="text-gray-700 mb-4 text-center">{artist.description}</p>
                        <button
                            className="mt-auto bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
                            onClick={() => handleOpenModal(artist)}
                        >
                            Voir Détails
                        </button>
                    </div>
                ))}
            </div>

            {selectedArtist && (
                <ArtistModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    onSubmit={handleEditArtist}
                    artist={selectedArtist}
                />
            )}

            <CreateArtistModal
                isOpen={isCreateModalOpen}
                onRequestClose={handleCloseCreateModal}
                onSubmit={handleCreateArtist} // Passer la fonction de création
            />
        </div>
    );
};

export default Artists;
