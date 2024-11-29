import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { petId, userId } = req.body;

    try {
      const { db } = await connectToDatabase();

      const result = await db.collection("Users").updateOne(
        { firebaseId: userId },
        { $addToSet: { adoptedPets: petId } } // Add petId to adoptedPets array
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Pet adopted successfully" });
      } else {
        res.status(404).json({ message: "User not found or pet already adopted" });
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
      res.status(500).json({ error: "Failed to adopt pet" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
