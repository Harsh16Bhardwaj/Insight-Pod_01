import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import PodcastCard from "../components/Card";

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch podcasts from API based on search query
  const fetchPodcasts = async (query) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/podcast/search", {
        params: { searchQuery: query },
        withCredentials: true, // Send the token with the request
      });
      setPodcasts(response.data.podcasts); // Store the podcast data
    } catch (error) {
      setError("Failed to fetch podcasts.");
      console.error("Error fetching podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search query change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Trigger search when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchPodcasts(searchQuery); // Trigger podcast search on submit if query exists
    }
  };

  // Initial fetch when component mounts (for recommended podcasts)
  useEffect(() => {
    const fetchInitialPodcasts = async () => {
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

    fetchInitialPodcasts();
  }, []);

  return (
    <div className="p-6">
      <div className="glass-effect rounded-xl p-8">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center space-x-5"
        >
          <div className="">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your favorites"
              className="h-10 p rounded-xl w-96 text-black pl-3"
            />
          </div>
          <button
            type="submit"
            className="p-2 px-6 bg-gray-800 rounded-xl"
            disabled={!searchQuery.trim()} // Disable the button if searchQuery is empty
          >
            Go
          </button>
        </form>
      </div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Recommended Podcasts
      </h1>

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
