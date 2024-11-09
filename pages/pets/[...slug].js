import fs from "fs";
import path from "path";
import Link from "next/link";

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "pets.json");
  const petsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Generate paths for both the main pet detail and the article page
  const paths = petsData.flatMap((pet) => [
    { params: { slug: [pet.slug] } },            // /pets/[slug]
    { params: { slug: [pet.slug, "article"] } }  // /pets/[slug]/article
  ]);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "data", "pets.json");
  const petsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Extract the slug segments from params
  const [petSlug, pageType] = params.slug;
  const pet = petsData.find((pet) => pet.slug === petSlug);

  if (!pet) {
    return { notFound: true };
  }

  // Determine if we're on the article page or the main detail page
  const isArticle = pageType === "article";

  return { props: { pet, isArticle } };
}

export default function PetDetails({ pet, isArticle }) {
  if (!pet) return <p>Pet not found</p>;

  return (
    <div className="pet-details">
      {isArticle ? (
        // Render the article page content
        <>
          <h1>About {pet.title}</h1>
          <p className="article">{pet.article}</p>
          <Link href={`/pets/${pet.slug}`}>
            <a>Back to {pet.title} Details</a>
          </Link>
        </>
      ) : (
        // Render the main pet details page content
        <>
          <h1>{pet.title}</h1>
          <img src={pet.image} alt={pet.title} />
          <p><strong>Description:</strong> {pet.description}</p>
          <p><strong>Color:</strong> {pet.color}</p>
          <p><strong>Qualities:</strong> {pet.qualities.join(", ")}</p>
          <p><strong>Available Quantity:</strong> {pet.quantity}</p>
        </>
      )}
    </div>
  );
}
