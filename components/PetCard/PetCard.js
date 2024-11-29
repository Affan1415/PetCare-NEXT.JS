import React from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";

const PetCard = ({ pet }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleToggleFavorite = () => {
    if (isFavorite(pet._id)) {
      removeFromFavorites(pet._id);
    } else {
      addToFavorites(pet._id);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* Image and Link to Pet Details */}
      <Link href={`/pets/${pet._id}`}>
        <div className="relative h-48 w-full cursor-pointer">
          <img
            src={pet.photos[0] || "/images/default-pet.jpg"} // Default image fallback
            alt={pet.name}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      {/* Pet Details */}
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2">{pet.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Species: {pet.species}</p>
        <p className="text-sm text-gray-500 mb-2">Breed: {pet.breed}</p>
        <p className="text-sm text-gray-500 mb-2">Age: {pet.age} years</p>
        <p className="text-sm text-gray-500 mb-2">Location: {pet.location}</p>
        <p className="text-gray-700 mb-4">{pet.description}</p>

        {/* Buttons: Adopt and Favorite */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{pet.adoptionStatus}</p>
          <div className="flex space-x-2">
            {/* Link to Adopt Pet */}
            <Link href={`/pets/${pet._id}`}>
              <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-400">
                Adopt {pet.name}
              </button>
            </Link>

            {/* Add to Favorites Button */}
            <button
              onClick={handleToggleFavorite}
              className={`px-4 py-2 text-sm rounded-lg ${
                isFavorite(pet._id) ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
              } hover:${
                isFavorite(pet._id) ? "bg-red-400" : "bg-gray-400"
              }`}
            >
              {isFavorite(pet._id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
