import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios"; // Ensure the correct import path

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch podcasts based on user preferences
    const fetchPodcasts = async () => {
      try {
        const response = await axiosInstance.get("/podcast", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setPodcasts(response.data.podcasts);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching podcasts.");
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []); // Runs once when the component mounts

  if (loading) {
    return <div>Loading podcasts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Your Recommended Podcasts</h2>
      {podcasts.length > 0 ? (
        <ul>
          {podcasts.map((podcast) => (
            <li key={podcast._id}>
              <h3>{podcast.title}</h3>
              <p>{podcast.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No podcasts found based on your preferences.</p>
      )}
    </div>
  );
};

export default Dashboard;
