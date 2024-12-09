import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "@/components/PetCard/PetCard";

export default function Profile() {
  const router = useRouter();
  const { firebaseId } = router.query; // Get firebaseId from the URL
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [favorites, setFavorites] = useState([]); // Full pet data for favorites
  const [adoptedPets, setAdoptedPets] = useState([]); // Full pet data for adopted pets

  // Fetch user data, favorites, and adopted pets
  useEffect(() => {
    if (!firebaseId) return;

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data for firebaseId:", firebaseId); // Debug log
        const response = await axios.get(`/api/profile/${firebaseId}`);
        setUser(response.data);

        // Fetch favorites if user exists
        if (response.data.favorites?.length > 0) {
          const favoritesResponse = await axios.post("/api/getListedPets", {
            petIds: response.data.favorites,
          });
          setFavorites(favoritesResponse.data);
        }

        // Fetch adopted pets if user exists
        if (response.data.adoptedPets?.length > 0) {
          const adoptedPetsResponse = await axios.post("/api/getListedPets", {
            petIds: response.data.adoptedPets,
          });
          setAdoptedPets(adoptedPetsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [firebaseId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found or there was an error fetching data.</div>;

  const handleCreatePet = () => {
    router.push('/create-pet');
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        {/* Favorites */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Favorites</h2>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          ) : (
            <p>No favorites yet.</p>
          )}
        </div>

        {/* Adopted Pets */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Adopted Pets</h2>
          {adoptedPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {adoptedPets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </div>
          ) : (
            <p>No adopted pets yet.</p>
          )}
        </div>
         {/* Tile 3: Listed Pets */}
         <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Listed Pets</h2>
                    {user.listedPets.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {user.listedPets.map((petId) => (
                                <li key={petId}>Pet ID: {petId}</li>
                            ))}
                        </ul>
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
      </div>
    </div>
  );
}
