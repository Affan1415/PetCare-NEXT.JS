import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "pets.json");
  try {
    const petsData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log("Pets data fetched successfully:", petsData); // Log the data
    res.status(200).json(petsData);
  } catch (error) {
    console.error("Error reading pets data:", error); // Log any error
    res.status(500).json({ error: "Failed to load pets data" });
  }
}
