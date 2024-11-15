import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { petId } = req.query;
  const filePath = path.join(process.cwd(), "data", "reviews.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const reviews = JSON.parse(fileData);

  // Filter reviews based on the petId
  const petReviews = reviews.filter((review) => review.petId.toString() === petId);
  res.status(200).json({ reviews: petReviews });
}
