// pages/api/removefromfav.js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { petId, userId } = req.body;

        try {
            const { db } = await connectToDatabase();

            const result = await db.collection("Users").updateOne(
                { firebaseId: userId },
                { $pull: { favorites: petId } } // Remove petId from favorites
            );

            if (result.modifiedCount > 0) {
                res.status(200).json({ message: "Pet removed from favorites successfully" });
            } else {
                res.status(404).json({ message: "User not found or pet not in favorites" });
            }
        } catch (error) {
            console.error("Failed to update favorites:", error);
            res.status(500).json({ error: "Failed to remove pet from favorites" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
