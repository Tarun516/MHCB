import React, { useState } from "react";

const Navbar = () => {
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

        {/* Profile Picture with Dropdown */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/profile-picture.png" // Replace with your profile picture URL
            alt="Profile"
            className="w-8 h-8 rounded-full cursor-pointer transition-opacity duration-300"
          />
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
                  onClick={closeDropdown}
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                  onClick={closeDropdown}
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
