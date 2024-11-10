// components/FeaturesSection.js

export default function FeaturesSection() {
    return (
        <section id="features" className="bg-gray-50 p-8 shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-gray-800">Why Choose PetCare Connect?</h2>
            <p className="mt-4 text-gray-600">Discover the key features that make our platform unique and effective in connecting pets with families.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-xl">Easy Adoption Process</h3>
                    <p className="mt-2 text-gray-500">Streamlined steps for finding and adopting pets.</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-xl">Expert Advice</h3>
                    <p className="mt-2 text-gray-500">Access to pet care tips from experienced professionals.</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-xl">Success Stories</h3>
                    <p className="mt-2 text-gray-500">Real-life success stories that inspire and motivate.</p>
                </div>
            </div>
        </section>
    );
}
