// pages/api/pets/index.js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { db } = await connectToDatabase();
            const pets = await db.collection("Pets").find().toArray(); // Fetch all pets
            const isFeaturedpets = pets.filter((pet) => pet.isFeatured === "yes")
            res.status(200).json(isFeaturedpets);
        } catch (error) {
            console.error("Error fetching pets:", error);
            res.status(500).json({ error: "Failed to fetch pets from the database" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
