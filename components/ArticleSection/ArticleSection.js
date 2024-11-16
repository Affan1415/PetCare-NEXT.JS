import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ArticleSection() {
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedArticles = async () => {
            try {
                const response = await axios.get("/api/articles/featured");
                setFeaturedArticles(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching featured articles:", error);
                setError("Failed to load featured articles.");
                setLoading(false);
            }
        };

        fetchFeaturedArticles();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading featured articles...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <section id="articles" className="bg-white p-8 shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-gray-800">Pet Care Articles</h2>
            <p className="mt-4 text-gray-600">Explore expert advice and helpful articles on caring for your pets.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.length === 0 ? (
                    <p className="text-gray-600">No featured articles available.</p>
                ) : (
                    featuredArticles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-gray-100 p-4 rounded-lg shadow transition hover:shadow-lg"
                        >
                            <h3 className="font-semibold text-xl">{article.title}</h3>
                            <p className="mt-2 text-gray-500">{article.description}</p>
                            <Link href={`/all-articles/${article.id}`} className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
                                    Read More
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
