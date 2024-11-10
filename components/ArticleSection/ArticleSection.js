// components/ArticleSection.js

export default function ArticleSection() {
    return (
        <section id="articles" className="bg-white p-8 shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-gray-800">Pet Care Articles</h2>
            <p className="mt-4 text-gray-600">Explore expert advice and helpful articles on caring for your pets.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Example Article */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-xl">How to Care for a Puppy</h3>
                    <p className="mt-2 text-gray-500">Get expert tips on raising a happy, healthy puppy.</p>
                    <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">Read More</button>
                </div>
                {/* Add more articles here */}
            </div>
        </section>
    );
}
