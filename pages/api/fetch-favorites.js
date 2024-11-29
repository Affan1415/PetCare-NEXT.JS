import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const { db } = await connectToDatabase();
      const user = await db.collection("Users").findOne({ firebaseId: userId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ favorites: user.favorites || [] });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ error: "Failed to fetch favorites" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
