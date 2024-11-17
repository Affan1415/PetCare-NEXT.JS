import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "@/components/PetCard/PetCard";

export default function Profile() {
    const router = useRouter();
    const { firebaseId } = router.query; // Get firebaseId from the URL
    const [user, setUser] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // State for loading state
    const [listedPets, setListedPets] = useState([]);
    const [adoptedPets, setadoptedPets] = useState([])
    const [favourites, setfavourites] = useState([])

    useEffect(() => {
        const fetchfavourites = async () => {
            try {
                // Send a POST request with the listed pet IDs
                const response = await axios.post('/api/getListedPets', { petIds: user.favorites });
                setfavourites(response.data); // Set the full pet data
            } catch (error) {
                console.error("Error fetching listed pets:", error);
            }
        };

        if (user?.favorites?.length > 0) {
            fetchfavourites(); // Fetch pets if there are listed pet IDs
        }
    }, [user?.favorites]);

    useEffect(() => {
        const fetchadoptedPets = async () => {
            try {
                // Send a POST request with the listed pet IDs
                const response = await axios.post('/api/getListedPets', { petIds: user.adoptedPets });
                setsetadoptedPets(response.data); // Set the full pet data
            } catch (error) {
                console.error("Error fetching listed pets:", error);
            }
        };

        if (user?.adoptedPets?.length > 0) {
            fetchadoptedPets(); // Fetch pets if there are listed pet IDs
        }
    }, [user?.adoptedPets]);

    useEffect(() => {
        const fetchadoptedPets = async () => {
            try {
                // Send a POST request with the listed pet IDs
                const response = await axios.post('/api/getListedPets', { petIds: user.adoptedPets });
                setsetadoptedPets(response.data); // Set the full pet data
            } catch (error) {
                console.error("Error fetching listed pets:", error);
            }
        };

        if (user?.adoptedPets?.length > 0) {
            fetchadoptedPets(); // Fetch pets if there are listed pet IDs
        }
    }, [user?.adoptedPets]);

    useEffect(() => {
        if (firebaseId) {
            const fetchUserData = async () => {
                try {
                    // Fetch user data from the API endpoint using the firebaseId
                    const response = await axios.get(`/api/profile/${firebaseId}`);
                    setUser(response.data); // Set user data
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false); // Set loading to false once the data is fetched
                }
            };

            fetchUserData();
        }
    }, [firebaseId]);

    if (loading) return <div>Loading...</div>;

    if (!user) return <div>User not found or there was an error fetching data.</div>;

    const handleCreatePet = () => {
        router.push(`/create-pet`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Tile 1: Personal Info */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Address:</strong> {user.contactInfo?.address}</p>
                    <p><strong>Phone:</strong> {user.contactInfo?.phoneNumber}</p>
                </div>

                {/* Tile 2: Favorites */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Favorites</h2>
                    {favourites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {favourites.map((pet) => (
                                <PetCard key={pet._id} pet={pet} userId={user?.uid || null} />
                            ))}
                        </div>
                    ) : (
                        <p>No Favorites.</p>
                    )}
                </div>

                {/* Tile 3: Listed Pets */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Listed Pets</h2>
                    {listedPets.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {listedPets.map((pet) => (
                                <PetCard key={pet._id} pet={pet} userId={user?.uid} />
                            ))}
                        </div>
                    ) : (
                        <p>No pets listed for adoption.</p>
                    )}
                    <button
                        onClick={handleCreatePet}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Create New Pet
                    </button>
                </div>

                {/* Tile 4: Adopted Pets */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Adopted Pets</h2>
                    {adoptedPets.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {adoptedPets.map((pet) => (
                                <PetCard key={pet._id} pet={pet} userId={user?.uid || null} />
                            ))}
                        </div>
                    ) : (
                        <p>No pets adopted.</p>
                    )}

                </div>
            </div>
        </div>
    );
}
