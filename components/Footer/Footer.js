// components/Footer.js

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white text-center p-6 mt-8">
            <p>&copy; {new Date().getFullYear()} PetCare Connect. All rights reserved.</p>
            <p>Contact us: <a href="mailto:info@petcareconnect.com" className="text-blue-300">info@petcareconnect.com</a></p>
        </footer>
    );
}
