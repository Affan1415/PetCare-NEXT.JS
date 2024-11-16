import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "@/components/ArticleCard/ArticleCard";

export default function AllArticles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get("/api/articles/articles");
                setArticles(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setError("Failed to load articles.");
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <div className="text-center py-8">Loading articles...</div>;
    if (error) return <div className="text-center py-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">All Articles</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {articles.length === 0 ? (
                    <p>No articles available.</p>
                ) : (
                    articles.map((article) => (
                        <ArticleCard key={article._id} article={article} />
                    ))
                )}
            </div>
        </div>
    );
}
