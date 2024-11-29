// pages/api/profile/[firebaseId].js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === "GET") {
      const { firebaseId } = req.query;
      console.log("Received firebaseId:", firebaseId); // Log firebaseId for debugging

      if (!firebaseId) {
        return res.status(400).json({ error: "firebaseId query parameter is required" });
      }

      const user = await db.collection("Users").findOne({ firebaseId });

      if (!user) {
        console.error("User not found for firebaseId:", firebaseId); // Log error
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in /api/profile/[firebaseId]:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
