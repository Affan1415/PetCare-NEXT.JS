// pages/api/addtofav.js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { petId, userId } = req.body;

        try {
            const { db } = await connectToDatabase();

            // Add petId to user's favorites array if it’s not already there
            const result = await db.collection("Users").updateOne(
                { firebaseId: userId },
                { $addToSet: { favorites: petId } } // Add petId only if it's not already in the array
            );

            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "Pet added to favorites successfully" });
            } else {
                res.status(404).json({ message: "User not found or pet already in favorites" });
            }
        } catch (error) {
            console.error("Failed to update favorites:", error);
            res.status(500).json({ error: "Failed to add pet to favorites" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
