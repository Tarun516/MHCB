import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        if (selectedCategory) {
          let response;
          if (selectedCategory === "Video") {
            response = await axios.get("http://localhost:8000/api/v1/videos/get-videos");
          } else if (selectedCategory === "Article") {
            response = await axios.get("http://localhost:8000/api/v1/articles/get-articles");
          }
          setResources(Array.isArray(response.data) ? response.data : []);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <div>
          <button onClick={() => handleCategoryChange("Video")}>Videos</button>
          <button onClick={() => handleCategoryChange("Article")}>
            Articles
          </button>
          {/* Add more buttons for other categories */}
        </div>
        <div>
          {resources.map((resource) => (
            
            <div key={resource._id} className="resource-card p-4 bg-black" >
              {resource.type === "Video" && (
                <>
                  <img src={resource.image} alt={resource.title} />
                  <h3>{resource.title}</h3>
                  <p>{resource.content}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch
                  </a>
                </>
              )}
              {resource.type === "Article" && (
                <>
                  <img src={resource.image} alt={resource.title} />
                  <h3>{resource.title}</h3>
                  <p>{resource.content}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Resources;
