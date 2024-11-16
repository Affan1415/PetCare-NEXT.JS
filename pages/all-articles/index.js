import ArticleCard from "@/components/ArticleCard/ArticleCard";

export default function AllArticles({ articles }) {
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

export async function getStaticProps() {
    try {
        // Replace with your API endpoint
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
