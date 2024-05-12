import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login successful, navigate to home page
        navigate("/home");
      } else {
        // Login failed, display error message to user and clear password field
        console.error("Login failed:", response.statusText);
        setFormData({ ...formData, password: "" }); // Clear password field
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Log in
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-purple-500 bg-gray-100"
                placeholder="Email address"
              />
            </div>
            {/* Password input */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-purple-500 bg-gray-100"
                placeholder="Password"
              />
            </div>

            {/* Sign in button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold px-4 py-3 rounded-lg shadow-sm hover:from-pink-400 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
              >
                Log in
              </button>
            </div>
          </form>
          {/* Sign up link */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
