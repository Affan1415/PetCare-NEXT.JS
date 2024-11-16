// pages/api/articles/featured.js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { db } = await connectToDatabase();
            const articles = await db.collection("Articles").find().toArray();
            const featuredArticles = articles.filter((article) => article.isfeatured === true);
            res.status(200).json(featuredArticles);
        } catch (error) {
            console.error("Error fetching featured articles:", error);
            res.status(500).json({ error: "Failed to fetch featured articles from the database" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
