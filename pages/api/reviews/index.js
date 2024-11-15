import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "reviews.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const reviews = JSON.parse(fileData);

  if (req.method === "POST") {
    // Add a new review
    const { petId, username, review, rating } = req.body;
    const newReview = {
      petId,
      id: new Date().toISOString(),
      username,
      review,
      rating,
    };

    reviews.push(newReview);
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } else {
    // Fetch all reviews
    res.status(200).json({ reviews });
  }
}
