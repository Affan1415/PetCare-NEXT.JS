// pages/pets.js
import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "@/components/PetCard/PetCard";
import  useAuth  from "@/lib/useAuth"


export default function AllPets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    console.log(user);
    // const firebaseId = user.uid;

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get("/api/fetchpets");
                setPets(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching pets:", error);
                setError("Failed to load pets.");
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    if (loading) return <div className="text-center py-8">Loading pets...</div>;
    if (error) return <div className="text-center py-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">All Pets</h1>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pets.length === 0 ? (
                    <p>No pets available.</p>
                ) : (
                    pets.map((pet) => (
                        <PetCard key={pet._id} pet={pet} userId={user.uid} />
                    ))
                )}
            </div>
        </div>
    );
}
