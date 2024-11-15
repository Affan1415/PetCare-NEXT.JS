import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

const PetCard = ({ pet, userId }) => {
    const [isFavourite, setIsFavourite] = useState(false);

    // add use effect
    const handleFavouriteToggle = async () => {
        try {
            if (!isFavourite) {
                await axios.post("/api/favouriteshandler/addtofav", { petId: pet._id, userId });
            } else {
                await axios.post("/api/favouriteshandler/removefromfav", { petId: pet._id, userId });
            }
            setIsFavourite((prevState) => !prevState);
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="relative h-48 w-full">
                <Image
                    src={pet.photos[0] || "/images/default-pet.jpg"}
                    alt={pet.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                />
            </div>

            <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{pet.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Species: {pet.species}</p>
                <p className="text-sm text-gray-500 mb-2">Breed: {pet.breed}</p>
                <p className="text-sm text-gray-500 mb-2">Age: {pet.age} years</p>
                <p className="text-sm text-gray-500 mb-4">Location: {pet.location}</p>
                <p className="text-gray-700 mb-4">{pet.description}</p>

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{pet.adoptionStatus}</p>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-400">
                            Adopt {pet.name}
                        </button>
                        {userId ? (
                            <button
                                onClick={handleFavouriteToggle}
                                className={`px-4 py-2 text-sm rounded-lg ${isFavourite ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
                                    } hover:${isFavourite ? "bg-red-400" : "bg-gray-400"}`}
                            >
                                {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
                            </button>
                        ) : null}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
