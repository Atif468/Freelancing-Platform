import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import newRequest from "../utils/newRequest";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await newRequest.post('/auth/login', { username, password });
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate('/');
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-4">
                <h1 className="text-2xl font-semibold text-gray-700">Sign in</h1>
                <label htmlFor="username" className="block text-gray-600 text-sm font-medium">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    onChange={e => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <label htmlFor="password" className="block text-gray-600 text-sm font-medium">Password</label>
                <input
                    id="password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600">Login</button>
            </form>
        </div>
    );
};

export default Login;
