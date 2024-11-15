import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { id } = req.body;
  const filePath = path.join(process.cwd(), "data", "pets.json");
  const petsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const petIndex = petsData.findIndex((pet) => pet.id === id);
  if (petIndex > -1 && petsData[petIndex].quantity > 0) {
    petsData[petIndex].quantity -= 1;

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(petsData, null, 2));
    res.status(200).json({ success: true, pet: petsData[petIndex] });
  } else {
    res.status(400).json({ success: false, message: "Pet not available" });
  }
}
