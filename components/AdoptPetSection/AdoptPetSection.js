// components/AdoptPetSection.js
// pages/pets.js
import { useEffect, useState } from "react";
import axios from "axios";
import PetCard from "@/components/PetCard/PetCard";
import useAuth from "@/lib/useAuth"

export default function AdoptPetSection() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    // console.log(user);
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get("/api/getfeaturedpets");
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
        <section id="adopt" className="bg-blue-100 p-8 shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-gray-800">Adopt a Pet</h2>
            <p className="mt-4 text-gray-600">Find your new furry friend from our selection of adoptable pets.</p>
            <div className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pets.length === 0 ? (
                        <p>No pets available.</p>
                    ) : (
                        pets.map((pet) => (
                            <PetCard key={pet._id} pet={pet} userId={user?.uid ? user.uid : false} />
                        ))
                    )}
                </div>
                <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">View Available Pets</button>
            </div>
        </section>
    );
}
