import React from "react";
import Link from "next/link";

const ArticleCard = ({ article }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 p-6">
            <h3 className="text-2xl font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-500 mb-2">Author: {article.author}</p>
            <p className="text-gray-700 mb-4">{article.description}</p>
            <Link href={`/all-articles/${article.id}`} className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-400">
                    Read More
            </Link>
        </div>
    );
};

export default ArticleCard;
