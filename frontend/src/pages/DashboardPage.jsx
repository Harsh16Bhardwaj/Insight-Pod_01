import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import PodcastCard from "../components/Card";

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axiosInstance.get("/podcast", {
          withCredentials: true, // Send the token with the request
        });
        setPodcasts(response.data.podcasts); // Store the podcast data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch podcasts.");
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Recommended Podcasts</h1>
      
      {loading && <p className="text-white">Loading podcasts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {podcasts.map((podcast) => (
          <PodcastCard key={podcast._id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
