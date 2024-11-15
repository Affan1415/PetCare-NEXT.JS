// pages/api/pets/getSinglePet.js
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { petId } = req.query; // Extract petId from query parameters

            if (!petId || !ObjectId.isValid(petId)) {
                return res.status(400).json({ error: "Invalid or missing petId" });
            }

            const { db } = await connectToDatabase();

            // Fetch the pet with the given ID
            const pet = await db.collection("Pets").findOne({ _id: new ObjectId(petId) });

            if (!pet) {
                return res.status(404).json({ error: "Pet not found" });
            }

            res.status(200).json(pet);
        } catch (error) {
            console.error("Error fetching single pet:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
