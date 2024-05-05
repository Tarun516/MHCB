import React from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import backgroundImage from "./WhatsApp Image 2024-05-05 at 14.56.37_f7c61d00.jpg"; // Adjust the path to your image file

const Home = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Using the imported image
    backgroundSize: 'cover', // Adjust to 'cover' if you want the image to cover the entire background
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    paddingTop: '64px', // Adjust this value according to your Navbar's height
    boxSizing: 'border-box', // Ensure padding doesn't affect overall height
    display: 'flex',
    flexDirection: 'column'
  };

  const navbarWrapperStyle = {
    position: 'fixed', // Fixed positioning so Navbar stays at the top
    top: 0, // Align Navbar to the top
    width: '100%', // Navbar spans the full width
    zIndex: 1 // Ensure Navbar remains above the background
  };

  return (
    <div style={backgroundStyle} className="home-background">
      <header style={navbarWrapperStyle}>
        <Navbar />
      </header>
      <main style={{ flex: 1, paddingTop: '64px' }}> {/* Adjust padding to accommodate Navbar's height */}
        <Chatbot />
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
