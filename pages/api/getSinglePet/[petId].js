import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { petId } = req.query;

    if (!petId || !ObjectId.isValid(petId)) {
        return res.status(400).json({ error: "Invalid or missing petId" });
    }

    try {
        const { db } = await connectToDatabase();

        if (req.method === "GET") {
            // Fetch the pet with the given ID
            const pet = await db.collection("Pets").findOne({ _id: new ObjectId(petId) });

            if (!pet) {
                return res.status(404).json({ error: "Pet not found" });
            }

            // Enhance reviews with usernames
            const reviewsWithUsernames = await Promise.all(
                (pet.reviews || []).map(async (review) => {
                    const user = await db.collection("Users").findOne({ firebaseId: review.userId });
                    return {
                        ...review,
                        username: user ? user.username : "Unknown User", // Replace userId with username
                    };
                })
            );

            return res.status(200).json({ ...pet, reviews: reviewsWithUsernames });
        } else if (req.method === "POST") {
            // Add a new review to the reviews array
            const { userId, reviewText, rating } = req.body;

            if (!userId || !reviewText || !rating) {
                return res.status(400).json({ error: "Missing required fields: userId, reviewText, or rating." });
            }

            const newReview = {
                userId,
                reviewText,
                rating: parseInt(rating, 10),
            };

            const result = await db.collection("Pets").updateOne(
                { _id: new ObjectId(petId) },
                { $push: { reviews: newReview } }
            );

            if (result.modifiedCount === 0) {
                return res.status(500).json({ error: "Failed to add review to the pet." });
            }

            return res.status(200).json({ message: "Review added successfully!" });
        } else {
            return res.status(405).json({ error: "Method not allowed." });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}
