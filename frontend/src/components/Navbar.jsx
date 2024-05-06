import React from "react";

const Navbar = () => {
  const handleSignOut = async () => {
    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem("accessToken");

      // If access token is not available, handle the error
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // Perform signout actions by making a POST request to the logout endpoint
      const response = await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`, // Include the access token in the request headers
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // If the logout request is successful, redirect to the root page
        window.location.href = "/";
      } else {
        // If the logout request fails, log the error
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle any errors that occur during signout
    }
  };

  return (
    <nav className="bg-black p-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}

        {/* Navigation Links */}
        <div className="space-x-4">
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

        {/* Authentication Buttons */}
        <div>
          <button
            className="text-gray-300 hover:bg-transparent hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
