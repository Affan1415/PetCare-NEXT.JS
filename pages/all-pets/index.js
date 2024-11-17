import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "@/components/PetCard/PetCard"; // Ensure this is correctly imported from your project structure
import useAuth from "@/lib/useAuth"; // Ensure the path is correct for your authentication hook

export default function AllPets() {
    const [pets, setPets] = useState([]); // Full list of pets
    const [filteredPets, setFilteredPets] = useState([]); // Filtered list of pets for search
    const [searchTerm, setSearchTerm] = useState(""); // Search input value
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { user } = useAuth(); // Get the authenticated user

    // Fetch pets from the API
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get("/api/fetchpets"); // API endpoint to fetch pets
                setPets(response.data); // Set all pets
                setFilteredPets(response.data); // Initialize filtered pets with all pets
                setLoading(false); // Set loading to false
            } catch (error) {
                console.error("Error fetching pets:", error);
                setError("Failed to load pets."); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchPets();
    }, []);

    // Filter pets based on the search term
    useEffect(() => {
        const results = pets.filter((pet) =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPets(results); // Update filtered pets list
    }, [searchTerm, pets]);

    if (loading) return <div className="text-center py-8">Loading pets...</div>;
    if (error) return <div className="text-center py-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">All Pets</h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search pets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    className="w-1/2 p-2 border-2 border-pink-500 rounded text-center"
                />
            </div>

            {/* Grid Layout for Pet Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPets.length === 0 ? (
                    <p className="col-span-full text-center">No pets available.</p>
                ) : (
                    filteredPets.map((pet) => (
                        <PetCard
                            key={pet._id} // Use pet's unique ID as the key
                            pet={pet} // Pass pet data to PetCard
                            userId={user?.uid ? user.uid : false} // Pass user ID if available
                        />
                    ))
                )}
            </div>
        </div>
    );
}
