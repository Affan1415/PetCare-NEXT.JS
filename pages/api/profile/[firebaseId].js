import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    if (req.method === "GET") {
        const { firebaseId } = req.query;
        console.log(firebaseId)
        if (!firebaseId) {
            return res.status(400).json({ error: "firebaseId query parameter is required" });
        }

        try {
            const user = await db.collection("Users").findOne({ firebaseId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve user data" });
        }
    }

    else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
