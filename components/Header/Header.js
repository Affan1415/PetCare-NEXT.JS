import Link from 'next/link';
import  useAuth  from "@/lib/useAuth"
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signOut } from 'firebase/auth';


export default function Header() {
    const { user } = useAuth();
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);
    //             console.log(user.Created)
    //         } else {
    //             setUser(null);
    //         }
    //     });

    //     return () => unsubscribe(); // Cleanup the subscription on unmount
    // }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth); // This logs the user out
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Error logging out: ', error.message);
        }
    };

    const handleprofile = () => {

    }

    return (
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-4xl font-bold hover:text-yellow-300 transition duration-300">
                    PetCare Connect
                </h1>
                <nav className="flex items-center space-x-6">
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/all-pets" className="hover:text-yellow-300 transition duration-300">
                                Adopt a Pet
                            </Link>
                        </li>
                        <li>
                            <a href="#articles" className="hover:text-yellow-300 transition duration-300">
                                Articles
                            </a>
                        </li>
                        <li>
                            <a href="#stories" className="hover:text-yellow-300 transition duration-300">
                                Success Stories
                            </a>
                        </li>
                        <li>
                            <a href="#features" className="hover:text-yellow-300 transition duration-300">
                                Features
                            </a>
                        </li>
                    </ul>
                    {/* Login and Signup Links */}
                    <div className="flex space-x-4">
                        {user ? (
                            <>
                                <Link onClick={handleprofile}
                                href={`/profile/${user.uid}`} >
                                    <button className="text-white py-2 px-6 font-semibold hover:underline">
                                        Welcome, {user.email}
                                    </button>
                                </Link>
                                <button
                                    onClick={handleLogout} // Make sure to define handleLogout to handle the logout functionality
                                    className="bg-red-600 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:bg-red-700 transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/Login/Login">
                                    <button className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300">
                                        Login
                                    </button>
                                </Link>
                                <Link href="/auth/SignUp/SignUp">
                                    <button className="bg-yellow-400 text-blue-800 py-2 px-6 rounded-full font-semibold shadow-md hover:bg-yellow-500 transition duration-300">
                                        Signup
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                </nav>
            </div>
        </header>
    );
}
