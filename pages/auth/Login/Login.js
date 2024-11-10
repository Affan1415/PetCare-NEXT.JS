// pages/login.js
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User logged in: ", user);
            router.push("/"); // Redirect after login
        } catch (error) {
            console.error("Error logging in: ", error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <form onSubmit={handleLogin} className="w-80 p-6 bg-white rounded-lg shadow-md">
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <label htmlFor="password" className="block mt-4 mb-2 font-medium">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
