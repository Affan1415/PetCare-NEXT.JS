import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "Pet ID is required." });
        }

        try {
            const pet = await getPetById(id);
            res.status(200).json(pet);
        } catch (error) {
            console.error("Error fetching pet:", error);
            res.status(500).json({ error: "Failed to fetch pet." });
        }
    } else if (req.method === "POST") {
        const { petIds } = req.body;

        if (!petIds || !Array.isArray(petIds)) {
            return res.status(400).json({ error: "Invalid or missing pet IDs." });
        }

        try {
            const pets = await getPetsByIds(petIds);
            res.status(200).json(pets);
        } catch (error) {
            console.error("Error fetching pets:", error);
            res.status(500).json({ error: "Failed to fetch pets." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed." });
    }
}

async function getPetById(id) {
    try {
        const { db } = await connectToDatabase();

        // Convert ID to ObjectId
        const objectId = new ObjectId(id);

        // Fetch the pet with the given ID
        const pet = await db.collection("Pets").findOne({ _id: objectId });

        if (!pet) {
            throw new Error(`Pet with ID ${id} not found.`);
        }

        return pet;
    } catch (error) {
        console.error("Error in getPetById:", error);
        throw new Error("Failed to fetch pet.");
    }
}

async function getPetsByIds(petIds) {
    try {
        const { db } = await connectToDatabase();

        // Convert IDs to ObjectId
        const objectIds = petIds.map((id) => new ObjectId(id));

        // Fetch pets with the given IDs
        const pets = await db.collection("Pets").find({ _id: { $in: objectIds } }).toArray();

        return pets;
    } catch (error) {
        console.error("Error in getPetsByIds:", error);
        throw new Error("Failed to fetch pets.");
    }
}
