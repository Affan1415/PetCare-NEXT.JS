// pages/signup.js
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import axios from "axios";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await axios.post("/api/users", {
                firebaseId: user.uid,
                email: user.email,
                username,
                role: "user",
                contactInfo: {
                    address,
                    phoneNumber
                }
            });
            const firebaseId = user.uid;
            router.push(`/profile/${firebaseId}`);
        } catch (error) {
            console.error("Error signing up: ", error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
            <form onSubmit={handleSignup} className="w-80 p-6 bg-white rounded-lg shadow-md">
                <label htmlFor="username" className="block mb-2 font-medium">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                <label htmlFor="email" className="block mt-4 mb-2 font-medium">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                <label htmlFor="password" className="block mt-4 mb-2 font-medium">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
                <label htmlFor="address" className="block mt-4 mb-2 font-medium">Address</label>
                <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <label htmlFor="phoneNumber" className="block mt-4 mb-2 font-medium">Phone Number</label>
                <input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
