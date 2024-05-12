import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/users/check-login-status",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Received loggedInUser:", data.loggedInUser);
          setIsLoggedIn(data.loggedInUser);
        } else {
          throw new Error(
            `Failed to check login status: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error checking login status:", error.message);
      }
    };

    checkLoginStatus();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        document.cookie = "accessToken=; Max-Age=-99999999;";
        setIsLoggedIn(false);
        window.location.href = "/home";
      } else {
        throw new Error(`Logout failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <nav className="bg-black p-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
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

        {isLoggedIn ? (
          <div>
            <button
              className="text-gray-300 hover:bg-transparent hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <a
              href="/"
              className="text-gray-300 hover:bg-transparent hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
