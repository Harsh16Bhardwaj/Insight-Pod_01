import React from "react";
import { Link } from "react-router-dom"; // For navigation

const PodcastCard = ({ podcast }) => {
  return (
    <div className="relative bg-opacity-10 backdrop-blur-lg bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 w-80 mb-6">
      <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
        {podcast.category}
      </div>
      <h2 className="text-white text-lg font-semibold mb-2">{podcast.title}</h2>
      <p className="text-gray-300 text-sm line-clamp-2">
        {podcast.description}
      </p>
      <div className="mt-4">
        {/* Use Link to navigate */}
        <Link
          to={`/player/${podcast._id}`} // Include the podcast ID in the URL
          className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
        >
          Listen Now
        </Link>
      </div>
    </div>
  );
};

export default PodcastCard;
