import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { petId, userId } = req.body;

    try {
      const { db } = await connectToDatabase();

      const result = await db.collection("Users").updateOne(
        { firebaseId: userId },
        { $pull: { adoptedPets: petId } } // Remove petId from adoptedPets array
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Pet unadopted successfully" });
      } else {
        res.status(404).json({ message: "User not found or pet not adopted" });
      }
    } catch (error) {
      console.error("Error unadopting pet:", error);
      res.status(500).json({ error: "Failed to unadopt pet" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
