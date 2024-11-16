import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ArticleDetail({ article }) {
    if (!article) return <div className="text-center py-8">Article not found.</div>;

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

export async function getStaticPaths() {
    try {
        const response = await fetch(`http://localhost:3000/api/articles`);
        const articles = await response.json();

        const paths = articles.map((article) => ({
            params: { id: article._id },
        }));

        return {
            paths,
            fallback: 'blocking', 
        };
    } catch (error) {
        console.error("Error fetching paths:", error);

        return {
            paths: [],
            fallback: 'blocking',
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`http://localhost:3000/api/articles/${params.id}`);
        const article = await response.json();

        if (!article) {
            return { notFound: true }; 
        }

        return {
            props: {
                article,
            },
            revalidate: 60, 
        };
    } catch (error) {
        console.error("Error fetching article:", error);

        return {
            notFound: true, 
        };
    }
}