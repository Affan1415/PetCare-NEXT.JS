import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;

        try {
            const { db } = await connectToDatabase();
            const article = await db.collection("Articles").findOne({ id });

            if (!article) {
                res.status(404).json({ error: "Article not found" });
                return;
            }

            res.status(200).json(article);
        } catch (error) {
            console.error("Error fetching article:", error);
            res.status(500).json({ error: "Failed to fetch the article from the database" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
