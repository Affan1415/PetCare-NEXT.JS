import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { db } = await connectToDatabase();
            const articles = await db.collection("Articles").find().toArray(); // Fetch all articles
            res.status(200).json(articles);
        } catch (error) {
            console.error("Error fetching articles:", error);
            res.status(500).json({ error: "Failed to fetch articles from the database" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}