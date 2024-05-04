import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { asyncHandler } from "../../../backend/src/utils/asyncHandler";
import Card from "./Card";

function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resources based on selected category
    const fetchResources = asyncHandler(async () => {
      try {
        if (selectedCategory) {
          let response;
          if (selectedCategory === "videos") {
            response = await axios.get("/api/v1/videos/get-videos");
          } else if (selectedCategory === "articles") {
            response = await axios.get("/api/v1/articles/get-articles");
          }
          setResources(response.data);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    });

    fetchResources(); // Call the asyncHandler function
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <body>
        <div>
          {/* Category selection buttons */}
          <div>
            <button onClick={() => handleCategoryChange("videos")}>
              Videos
            </button>
            <button onClick={() => handleCategoryChange("articles")}>
              Articles
            </button>
            {/* Add more buttons for other categories */}
          </div>

          {/* Display cards for each resource */}
          <div>
            {resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <img src={resource.thumbnail} alt={resource.title} />
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                {/* Add more details like duration, author, etc. */}
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch / Read
                </a>
              </div>
              
            ))}
            {<Card id = ""/>}
          </div>
        </div>
      </body>
    </>
  );
}

export default Resources;
