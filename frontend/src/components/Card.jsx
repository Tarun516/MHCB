// ResourceCard.js
import React from "react";

function Card({ title, content, url }) {
  return (
    <div className="resource-card flex flex-col gap-4 ">
      <h3 className="font-bold text-green-900 text-xl">{title}</h3>
      <p className="text">{content}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-lg text-blue-700 hover:text-orange-300"
      >
        Watch
      </a>
    </div>
  );
}

export default Card;
