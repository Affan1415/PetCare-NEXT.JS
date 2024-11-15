import React from "react";
import Image from "next/image";
import axios from "axios";

const PetDetails = ({ pet }) => {
    if (!pet) {
        return <div className="text-center py-10">Pet not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="relative h-64 w-full md:w-1/2">
                    <Image
                        src={pet.photos[0] || "/images/default-pet.jpg"}
                        alt={pet.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
                    <p className="text-gray-600 mb-2">Species: {pet.species}</p>
                    <p className="text-gray-600 mb-2">Breed: {pet.breed}</p>
                    <p className="text-gray-600 mb-2">Age: {pet.age} years</p>
                    <p className="text-gray-600 mb-2">Location: {pet.location}</p>
                    <p className="text-gray-600 mb-4">Health Status: {pet.healthStatus}</p>
                    <p className="text-gray-800">{pet.description}</p>
                    <p className="text-gray-500 mt-4">Adoption Status: {pet.adoptionStatus}</p>
                </div>
            </div>
        </div>
    );
};

// Fetch data for each pet based on the ID (SSR)
export async function getServerSideProps({ params }) {
    const { petId } = params; // Get petId from the URL
    console.log(params)


    try {
        const response = await axios.get(`http://localhost:3000/api/getSinglePet/${petId}`);
        const pet = response.data;
        

        // Return pet data as props
        return {
            props: {
                pet, // Pass fetched pet data to the component
            },
        };
    } catch (error) {
        console.error("Error fetching pet details:", error);
        return {
            props: {
                pet: null, // If an error occurs, return null for pet
            },
        };
    }
}

export default PetDetails;
