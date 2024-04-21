import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Fetch resources based on selected category
    async function fetchResources() {
      try {
        const response = await axios.get(`/api/resources?category=${selectedCategory}`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    }

    fetchResources();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
    <header><Navbar/></header>a
    <body>
    <div>
      {/* Category selection buttons */}
      <div>
        <button onClick={() => handleCategoryChange('all')}>All</button>
        <button onClick={() => handleCategoryChange('videos')}>Videos</button>
        <button onClick={() => handleCategoryChange('articles')}>Articles</button>
        {/* Add more buttons for other categories */}
      </div>

      {/* Display cards for each resource */}
      <div>
        {resources.map(resource => (
          <div key={resource.id} className="resource-card">
            <img src={resource.thumbnail} alt={resource.title} />
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            {/* Add more details like duration, author, etc. */}
            <a href={resource.url} target="_blank" rel="noopener noreferrer">Watch / Read</a>
          </div>
        ))}
      </div>
    </div>
    </body>
    </>
  );
}

export default Resources;
