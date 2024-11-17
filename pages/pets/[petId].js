import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

const PetDetails = ({ pet }) => {
    const [reviews, setReviews] = useState(pet.reviews || []);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const auth = getAuth(firebaseApp);

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
                console.log("User logged in:", user);
            } else {
                console.error("No user is logged in.");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!reviewText.trim() || !rating) {
            setError("Please provide both a review text and a rating.");
            return;
        }

        if (!userId) {
            setError("You must be logged in to leave a review.");
            return;
        }

        const newReview = {
            userId,
            reviewText: reviewText.trim(),
            rating: parseInt(rating, 10),
        };

        try {
            // Submit the review to the backend
            const response = await axios.post(`/api/getSinglePet/${pet._id}`, newReview);

            if (response.status === 200) {
                // Fetch updated reviews with usernames
                const updatedReviewsResponse = await axios.get(`/api/getSinglePet/${pet._id}`);
                setReviews(updatedReviewsResponse.data.reviews); // Update reviews with the latest data
                setReviewText("");
                setRating(0);
                setSuccess("Review submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setError("Failed to submit the review. Please try again.");
        }
    };

    if (!pet) {
        return <div className="text-center py-10">Pet not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            {/* Pet Details */}
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

            {/* Reviews Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
                                <p className="text-sm text-gray-600">Username: {review.username || "Unknown User"}</p>
                                <p className="text-gray-800">  {review.reviewText}  </p>
                                <p className="text-yellow-500">Rating: {review.rating}/5</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}

                {/* Review Form */}
                <form onSubmit={handleSubmitReview} className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {success && <p className="text-green-500 mb-2">{success}</p>}
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        placeholder="Rating (1-5)"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

// Fetch paths for Static Generation
export async function getStaticPaths() {
    try {
        const response = await axios.get("http://localhost:3000/api/fetchpets");
        const pets = response.data;

        const paths = pets.map((pet) => ({
            params: { petId: pet._id },
        }));

        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        console.error("Error fetching pets for paths:", error);
        return {
            paths: [],
            fallback: true,
        };
    }
}

// Fetch pet data for Static Generation
export async function getStaticProps({ params }) {
    const { petId } = params;

    try {
        const response = await axios.get(`http://localhost:3000/api/getSinglePet/${petId}`);
        const pet = response.data;

        return {
            props: {
                pet,
            },
            revalidate: 100,
        };
    } catch (error) {
        console.error("Error fetching pet details:", error);
        return {
            props: {
                pet: null,
            },
        };
    }
}

export default PetDetails;
