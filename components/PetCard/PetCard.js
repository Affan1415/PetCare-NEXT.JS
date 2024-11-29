import React from "react";
import { useAdopt } from "@/contexts/AdoptContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";

const PetCard = ({ pet }) => {
  const { adoptPet, unadoptPet, isAdopted } = useAdopt();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleToggleAdopt = () => {
    if (isAdopted(pet._id)) {
      unadoptPet(pet._id);
    } else {
      adoptPet(pet._id);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      <Link href={`/pets/${pet._id}`}>
        <div className="relative h-48 w-full cursor-pointer">
          <img
            src={pet.photos[0] || "/images/default-pet.jpg"}
            alt={pet.name}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2">{pet.name}</h3>
        <p className="text-sm text-gray-500 mb-2">Species: {pet.species}</p>
        <p className="text-sm text-gray-500 mb-2">Breed: {pet.breed}</p>
        <p className="text-sm text-gray-500 mb-2">Age: {pet.age} years</p>
        <p className="text-sm text-gray-500 mb-2">Location: {pet.location}</p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={handleToggleAdopt}
              className={`px-4 py-2 text-sm rounded-lg ${
                isAdopted(pet._id)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              } hover:${
                isAdopted(pet._id) ? "bg-green-400" : "bg-gray-400"
              }`}
            >
              {isAdopted(pet._id) ? "Unadopt" : "Adopt"}
            </button>

            <button
              onClick={() =>
                isFavorite(pet._id)
                  ? removeFromFavorites(pet._id)
                  : addToFavorites(pet._id)
              }
              className={`px-4 py-2 text-sm rounded-lg ${
                isFavorite(pet._id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-700"
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
