import React from "react";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <body>
        <Chatbot/>
      </body>
      <footer></footer>
    </>
  );
};

export default Home;
