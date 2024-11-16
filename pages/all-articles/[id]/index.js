import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/articles/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching article:", error);
                setError("Failed to load the article.");
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <div className="text-center py-8">Loading article...</div>;
    if (error) return <div className="text-center py-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">{article.title}</h1>
            <p className="text-sm text-gray-500 mb-4">By {article.author}</p>
            <div className="text-gray-700 leading-relaxed">
                <p className="mb-4 font-semibold">{article.wholeArticle.introduction}</p>
                {article.wholeArticle.sections.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">{section.heading}</h2>
                        <p>{section.content}</p>
                    </div>
                ))}
                <p className="mt-4 font-semibold">{article.wholeArticle.conclusion}</p>
            </div>
        </div>
    );
}
