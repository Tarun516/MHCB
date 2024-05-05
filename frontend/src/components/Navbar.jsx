import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let timeoutId;

  const closeDropdown = () => {
    timeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeDropdown();
  };

  const handleSignOut = async () => {
    try {
      // Call the logout API
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout"
      );
      console.log("Logged out successfully");
      if (response.ok) {
        // Logout successful, update isLoggedIn state
        setIsLoggedIn(false);
        // Redirect to home page or any other page if needed
      }
      // Handle any additional actions after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/check-login-status"
        );
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <nav className="bg-black p-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div>
          <a href="/" className="text-white font-bold text-lg">
            Your Logo
          </a>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <a
            href="/about"
            className="text-gray-300 hover:bg-transparent hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            About us
          </a>
          <a
            href="/resources"
            className="text-gray-300 hover:bg-transparent hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Resources
          </a>
          <a
            href="/contacts"
            className="text-gray-300 hover:bg-transparent hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Contacts
          </a>
          <a
            href="/feedback"
            className="text-gray-300 hover:bg-transparent hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Feedback
          </a>
        </div>

        {/* Profile Picture */}
        {isLoggedIn && (
          <div>
            <img
              src="/profile-picture.png" // Replace with your profile picture URL
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer transition-opacity duration-300"
            />
          </div>
        )}

        {/* Sign-out Button */}
        {isLoggedIn && (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                    onClick={handleSignOut} // Call handleSignOut function on click
                  >
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
