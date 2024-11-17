// pages/api/pets.js
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, species, breed, age, description, healthStatus, photos, location, adoptionStatus, createdBy ,isFeatured ,reviews = [], } = req.body;

        try {
            const { db } = await connectToDatabase();
            
            // Step 1: Create a new pet in the pets collection
            const newPet = await db.collection("Pets").insertOne({
                name,
                species,
                breed,
                age,
                description,
                healthStatus,
                photos: photos.split(',').map(url => url.trim()), // Convert comma-separated string to array
                location,
                adoptionStatus,
                createdBy, // Firebase ID of the user who listed the pet
                createdAt: new Date(),
                isFeatured,
                reviews,
            });

            // Step 2: Find the user by Firebase ID and update their listedPets array
            const user = await db.collection("Users").findOne({ firebaseId: createdBy });
            
            if (user) {
                await db.collection("Users").updateOne(
                    { firebaseId: createdBy }, 
                    { $push: { listedPets: newPet.insertedId } }  // Add the pet ID to the listedPets array
                );
                
                // Step 3: Send a successful response
                res.status(200).json({ message: "Pet created successfully", petId: newPet.insertedId });
            } else {
                res.status(404).json({ error: "User not found" });
            }
        } catch (error) {
            console.error("Error creating pet:", error);
            res.status(500).json({ error: "Failed to create pet in database" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
