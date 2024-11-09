import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [petList, setPetList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for the search input
  const [filteredPets, setFilteredPets] = useState([]); // State for the filtered list

  // Load data from the API when the component mounts
  function load() {
    fetch("/api/fetchpets")
      .then((res) => res.json())
      .then((data) => {
        setPetList(data);
        setFilteredPets(data); // Initialize filtered list with all pets
      });
  }

  useEffect(() => {
    load(); // Fetch the data when the component mounts
  }, []);

  const handleAdopt = (id) => {
    fetch("/api/adoptPet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPetList(
            petList.map((pet) =>
              pet.id === id ? { ...pet, quantity: pet.quantity - 1 } : pet
            )
          );
        } else {
          alert("This pet is no longer available for adoption.");
        }
      });
  };

  // Filter pets whenever the search query changes
  useEffect(() => {
    setFilteredPets(
      petList.filter((pet) =>
        pet.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, petList]);

  return (
    <div className="container">
      {/* Banner Section */}
      <div className="banner">
        <Image
          src="/images/pets.jpg" // Replace with the path to your banner image
          alt="Welcome Banner"
          layout="fill"
          objectFit="cover"
          className="banner-image"
        />
        <h1 className="banner-title">Welcome</h1>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a pet..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Pet List Section */}
      <h1>Available Pets for Adoption</h1>
      <div className="pet-list">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img src={pet.image} alt={pet.title} />
            <Link href={`/pets/${pet.id}`}>
              <h2>{pet.title}</h2>
            </Link>
            <p>{pet.description}</p>
            <p>Available: {pet.quantity}</p>
            <Link href={`/pets/${pet.slug}`}>
              View {pet.title} complete Article
            </Link>
            <button
              onClick={() => handleAdopt(pet.id)}
              disabled={pet.quantity === 0}
            >
              Adopt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
