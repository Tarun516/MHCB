// ResourceCard.js
import React from "react";

function Card({ image, title, content, url }) {
  return (
    <div className="resource-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p className="text">{content}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-lg text-blue-700"
      >
        Watch
      </a>
    </div>
  );
}

export default Card;
