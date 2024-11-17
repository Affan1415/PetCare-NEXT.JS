import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";  // Make sure you have the Firebase config

export default function CreatePet() {
    const router = useRouter();
    const [petData, setPetData] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        description: "",
        healthStatus: "",
        photos: "",
        location: "",
        adoptionStatus: "available", // Default status
        isFeatured:"yes",
        reviews:[],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [firebaseId, setFirebaseId] = useState("");

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const user = auth.currentUser;
        if (user) {
            setFirebaseId(user.uid);  // Store the firebase ID
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData({ ...petData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!firebaseId) {
            setError("User must be logged in to add a pet.");
            setLoading(false);
            return;
        }

        const petPayload = {
            ...petData,
            createdBy: firebaseId,  // Attach the firebase ID
        };

        try {
            // Send a POST request to create the pet
            await axios.post("/api/create-pet", petPayload);
            setSuccess("Pet created successfully!");
            router.push(`/profile/${firebaseId}`); // Redirect back to profile after success
        } catch (error) {
            setError("Error adding the pet.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Create New Pet</h1>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Pet Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={petData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="species" className="block text-sm font-semibold mb-2">
                        Species (e.g., Dog, Cat)
                    </label>
                    <input
                        type="text"
                        name="species"
                        value={petData.species}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="breed" className="block text-sm font-semibold mb-2">
                        Breed
                    </label>
                    <input
                        type="text"
                        name="breed"
                        value={petData.breed}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-semibold mb-2">
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
                        value={petData.age}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-semibold mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={petData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="healthStatus" className="block text-sm font-semibold mb-2">
                        Health Status (e.g., Healthy, Needs Vaccination)
                    </label>
                    <input
                        type="text"
                        name="healthStatus"
                        value={petData.healthStatus}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="photos" className="block text-sm font-semibold mb-2">
                        Pet Photos (Comma separated URLs)
                    </label>
                    <input
                        type="text"
                        name="photos"
                        value={petData.photos}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., http://example.com/photo1.jpg, http://example.com/photo2.jpg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-sm font-semibold mb-2">
                        Location (e.g., Shelter Name, City)
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={petData.location}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="adoptionStatus" className="block text-sm font-semibold mb-2">
                        Adoption Status
                    </label>
                    <select
                        name="adoptionStatus"
                        value={petData.adoptionStatus}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="adopted">Adopted</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="isFeatured" className="block text-sm font-semibold mb-2">
                        Is Featured
                    </label>
                    <select
                        name="isFeatured"
                        value={petData.isFeatured}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg"
                >
                    {loading ? "Creating..." : "Create Pet"}
                </button>
            </form>
        </div>
    );
}
