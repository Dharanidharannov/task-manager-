import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/forgotpassword", {
                Email: email,
            });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className=" background flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-pink-200 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                    Forgot Password
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl text-white font-bold"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(37,15,60,1) 0%, rgba(87,48,156,1) 100%)",
                        }}
                    >
                        Submit
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-green-600 text-center">{message}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-600 text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;

