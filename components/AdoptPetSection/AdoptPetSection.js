// components/AdoptPetSection.js

export default function AdoptPetSection() {
    return (
        <section id="adopt" className="bg-blue-100 p-8 shadow-lg rounded-lg mt-8">
            <h2 className="text-3xl font-semibold text-gray-800">Adopt a Pet</h2>
            <p className="mt-4 text-gray-600">Find your new furry friend from our selection of adoptable pets.</p>
            <div className="mt-6">
                <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">View Available Pets</button>
            </div>
        </section>
    );
}
