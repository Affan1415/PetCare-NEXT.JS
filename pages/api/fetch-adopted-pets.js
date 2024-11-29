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

      res.status(200).json({ adopted: user.adoptedPets || [] });
    } catch (error) {
      console.error("Error fetching adopted pets:", error);
      res.status(500).json({ error: "Failed to fetch adopted pets" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
