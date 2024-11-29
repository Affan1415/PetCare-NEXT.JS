import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import useAuth from "@/lib/useAuth";

const AdoptContext = createContext();

export const useAdopt = () => useContext(AdoptContext);

export const AdoptProvider = ({ children }) => {
  const { user } = useAuth(); // Get authenticated user
  const [adoptedPets, setAdoptedPets] = useState([]); // Store adopted pet IDs

  // Fetch adopted pets when the user logs in
  useEffect(() => {
    const fetchAdoptedPets = async () => {
      if (user) {
        try {
          const response = await axios.get("/api/fetch-adopted-pets", {
            params: { userId: user.uid },
          });
          setAdoptedPets(response.data.adopted || []);
        } catch (error) {
          console.error("Error fetching adopted pets:", error);
        }
      } else {
        setAdoptedPets([]); // Clear on logout
      }
    };

    fetchAdoptedPets();
  }, [user]);

  // Adopt a pet
  const adoptPet = async (petId) => {
    if (!user) return; // Ensure user is logged in
    try {
      await axios.post("/api/adopt-pet", { petId, userId: user.uid });
      setAdoptedPets((prev) => [...prev, petId]);
    } catch (error) {
      console.error("Error adopting pet:", error);
    }
  };

  // Unadopt a pet
  const unadoptPet = async (petId) => {
    if (!user) return; // Ensure user is logged in
    try {
      await axios.post("/api/unadopt-pet", { petId, userId: user.uid });
      setAdoptedPets((prev) => prev.filter((id) => id !== petId));
    } catch (error) {
      console.error("Error unadopting pet:", error);
    }
  };

  // Check if a pet is adopted
  const isAdopted = (petId) => adoptedPets.includes(petId);

  return (
    <AdoptContext.Provider
      value={{ adoptedPets, adoptPet, unadoptPet, isAdopted }}
    >
      {children}
    </AdoptContext.Provider>
  );
};
