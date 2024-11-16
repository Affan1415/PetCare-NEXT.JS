import ArticleCard from "@/components/ArticleCard/ArticleCard";
import { useState } from "react";

export default function AllArticles({ articles }) {
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [filter, setFilter] = useState("");

    const handleFilterChange = (keyword) => {
        if (keyword === "all") {
            setFilteredArticles(articles); 
        } else {
            const singular = keyword.slice(0, -1); 
            setFilteredArticles(
                articles.filter((article) =>
                    article.title.toLowerCase().includes(keyword.toLowerCase()) ||
                    article.title.toLowerCase().includes(singular.toLowerCase())
                )
            );
        }
        setFilter(keyword); 
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">All Articles</h1>

            <div className="flex justify-center gap-4 mb-6">
                {["all", "dogs", "cats", "rabbits", "fish"].map((keyword) => (
                    <button
                        key={keyword}
                        onClick={() => handleFilterChange(keyword)}
                        className={`px-4 py-2 rounded ${
                            filter === keyword ? "bg-blue-500 text-white" : "bg-gray-300"
                        }`}
                    >
                        {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredArticles.length === 0 ? (
                    <p>No articles available for the selected filter.</p>
                ) : (
                    filteredArticles.map((article) => (
                        <ArticleCard key={article._id} article={article} />
                    ))
                )}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    try {
        const response = await fetch(`http://localhost:3000/api/articles/articles`);
        const articles = await response.json();

        return {
            props: {
                articles,
            },
            revalidate: 60, 
        };
    } catch (error) {
        console.error("Error fetching articles:", error);

        return {
            props: {
                articles: [], 
            },
            revalidate: 60,
        };
    }
}
