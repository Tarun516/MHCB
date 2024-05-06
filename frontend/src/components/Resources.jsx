import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Card from "./Card";

function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        if (selectedCategory) {
          let response;
          if (selectedCategory === "Video") {
            response = await axios.get(
              "http://localhost:3000/api/v1/videos/get-videos"
            );
          } else if (selectedCategory === "Article") {
            response = await axios.get(
              "http://localhost:3000/api/v1/articles/get-articles"
            );
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
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <header>
        <Navbar />
      </header>
      <body>
        <div className="w-full">
          <div className="button-container p-4 bg-red mt-[60px] flex justify-center gap-5">
            <button
              className={`button ${
                selectedCategory === "Video" && "selected"
              } bg-transparent rounded-lg text-xl`}
              onClick={() => handleCategoryChange("Video")}
              style={{ marginRight: "10px" }}
            >
              Videos
            </button>
            <button
              className={`button ${
                selectedCategory === "Article" && "selected"
              } bg-transparent rounded-lg text-xl`}
              onClick={() => handleCategoryChange("Article")}
            >
              Articles
            </button>
            {/* Add more buttons for other categories */}
          </div>
          <div className="flex justify-center items-center gap-20 mt-10">
            {resources.map((resource) => (
              <div
                key={resource._id}
                className="resource-card bg-slate-300 py-9 px-6 w-50"
              >
                {resource.type === "Video" && (
                  <Card
                    key={resource._id}
                    title={resource.title}
                    content={resource.content}
                    url={resource.url}
                  />
                )}
                {resource.type === "Article" && (
                  <Card
                    key={resource._id}
                    title={resource.title}
                    content={resource.content}
                    url={resource.url}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </body>
    </div>
  );
}

export default Resources;
