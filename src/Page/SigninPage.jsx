import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/signin", {
        Email: email,
        Password: password,
      });

      console.log(response.data);

      if (response.data && response.data.employee && response.data.employee._id) {
        const userRole = response.data.employee.Role.RoleName;
        
        if (userRole === "Admin") {
          sessionStorage.setItem("adminId", response.data.employee._id);
          console.log("Admin ID stored in localStorage:", response.data.employee._id);
          navigate("/admin-dashboard");
        } else {
          sessionStorage.setItem("empId", response.data.employee._id);
          console.log("Employee ID stored in localStorage:", response.data.employee._id);
          navigate("/dashboard");
        }
      } else {
        setError("Invalid credentials or employee not found.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-100 to-purple-300">
      <div className="relative bg-pink-200 p-8 rounded-lg w-full max-w-md shadow-lg">
        {/* Logo */}
        <img
          src={require("../Assest/Logo_Blue 1.png")}
          alt="Logo"
          className="w-24 mx-auto mb-6"
        /> 

        {/* Heading */}
        <h3 className="text-center text-2xl font-bold mb-8 text-gray-800">
          Welcome
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              name="Email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold transition duration-200"
            style={{
              background: "linear-gradient(90deg, rgba(37,15,60,1) 0%, rgba(87,48,156,1) 100%)"
            }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Forgot Password */}
        <p
          onClick={() => navigate("/reset-password")}
          className="mt-6 ml-60 text-center text-blue-600 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

export default Signin;


