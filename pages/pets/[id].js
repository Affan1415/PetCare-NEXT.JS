import fs from "fs";
import path from "path";
import { useState, useRef } from "react";

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "pets.json");
  const petsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const paths = petsData.map((pet) => ({
    params: { id: pet.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch pet data
  const petFilePath = path.join(process.cwd(), "data", "pets.json");
  const petsData = JSON.parse(fs.readFileSync(petFilePath, "utf8"));
  const pet = petsData.find((pet) => pet.id.toString() === params.id);

  // Fetch reviews data
  const reviewsFilePath = path.join(process.cwd(), "data", "reviews.json");
  const reviewsData = JSON.parse(fs.readFileSync(reviewsFilePath, "utf8"));

  // Filter reviews for this pet
  const petReviews = reviewsData.filter((review) => review.petId.toString() === params.id);

  return { props: { pet, reviews: petReviews } };
}

export default function PetDetails({ pet, reviews }) {
  const [reviewList, setReviewList] = useState(reviews);
  const usernameRef = useRef();
  const reviewRef = useRef();
  const ratingRef = useRef();

  function submitReview(event) {
    event.preventDefault();
    const username = usernameRef.current.value;
    const review = reviewRef.current.value;
    const rating = ratingRef.current.value;

    fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        petId: pet.id,
        username,
        review,
        rating: parseInt(rating),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReviewList((prevReviews) => [
          ...prevReviews,
          { petId: pet.id, username, review, rating: parseInt(rating) },
        ]);
      });
  }

  return (
    <div className="pet-details">
      <h1>{pet.title}</h1>
      <img src={pet.image} alt={pet.title} />
      <p><strong>Description:</strong> {pet.description}</p>
      <p><strong>Color:</strong> {pet.color}</p>
      <p><strong>Qualities:</strong> {pet.qualities.join(", ")}</p>
      <p><strong>Available Quantity:</strong> {pet.quantity}</p>

      <h2>Reviews</h2>
      <ul className="reviews-list">
        {reviewList.map((rev, index) => (
          <li key={index} className="review-item">
            <p><strong>{rev.username}</strong>: {rev.review}</p>
            <p>Rating: {rev.rating}/5</p>
          </li>
        ))}
      </ul>

      <div className="review-form-container">
        <h3>Add a Review</h3>
        <form onSubmit={submitReview}>
          <div>
            <label htmlFor="username">Name:</label>
            <input type="text" id="username" ref={usernameRef} required />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea id="review" ref={reviewRef} rows="3" required></textarea>
          </div>
          <div>
            <label htmlFor="rating">Rating (1-5):</label>
            <input type="number" id="rating" ref={ratingRef} min="1" max="5" required />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}
