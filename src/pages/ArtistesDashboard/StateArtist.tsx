// src/components/Artists.tsx
import React, { useEffect, useState } from 'react';

interface Artist {
    idArtist: number;
    name: string;
    description: string;
    // Ajoutez d'autres propriétés d'artiste si nécessaire
}

const Artists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>(''); // État pour la recherche

    useEffect(() => {
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
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erreur lors de la récupération des artistes');
                }

                const data = await response.json();
                setArtists(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    // Filtrer les artistes en fonction du terme de recherche
    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher par nom d'artiste..."
                className="mb-4 p-2 border border-gray-300 rounded w-full md:w-1/3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Met à jour l'état de recherche
            />

            {/* Affichage des artistes filtrés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredArtists.map((artist) => (
                    <div
                        key={artist.idArtist}
                        className="border border-gray-300 rounded-lg shadow-md overflow-hidden p-4 flex flex-col"
                    >
                        <h3 className="text-lg font-bold mb-2">{artist.name}</h3>
                        <p className="text-gray-700 mb-4">{artist.description}</p>
                        <button className="mt-auto bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">
                            Voir Détails
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Artists;
