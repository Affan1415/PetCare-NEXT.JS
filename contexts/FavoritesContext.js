import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import useAuth from "@/lib/useAuth";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axios.get("/api/fetch-favorites", {
            params: { userId: user.uid },
          });
          setFavorites(response.data.favorites || []);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      } else {
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [user]);

  // Add a pet to favorites
  const addToFavorites = async (petId) => {
    if (!user) return; 
    try {
      await axios.post("/api/favouriteshandler/addtofav", { petId, userId: user.uid });
      setFavorites((prev) => [...prev, petId]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  // Remove a pet from favorites
  const removeFromFavorites = async (petId) => {
    if (!user) return; // Ensure user is logged in
    try {
      await axios.post("/api/favouriteshandler/removefromfav", { petId, userId: user.uid });
      setFavorites((prev) => prev.filter((id) => id !== petId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  // Check if a pet is a favorite
  const isFavorite = (petId) => favorites.includes(petId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
