import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialPodcasts, setSearchedPodcasts, setLoading, setError } from "../store/slices/podcastSlice"; // Import actions
import axiosInstance from "../utils/axios";
import PodcastCard from "../components/Card";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { initialPodcasts, searchedPodcasts, loading, error } = useSelector((state) => state.podcast); // Access Redux state

  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch initial podcasts when the component mounts
  useEffect(() => {
    const fetchInitialPodcasts = async () => {
      dispatch(setLoading()); // Dispatch loading action
      try {
        const response = await axiosInstance.get("/podcast", {
          withCredentials: true, // Send the token with the request
        });
        dispatch(setInitialPodcasts(response.data.podcasts)); // Store the initial podcasts in Redux
      } catch (err) {
        dispatch(setError("Failed to fetch podcasts."));
      }
    };

    fetchInitialPodcasts();
  }, [dispatch]);

  // Fetch podcasts based on search query
  const fetchPodcasts = async (query) => {
    dispatch(setLoading()); // Dispatch loading action
    try {
      const response = await axiosInstance.get("/podcast/search", {
        params: { searchQuery: query },
        withCredentials: true, // Send the token with the request
      });
      dispatch(setSearchedPodcasts(response.data.podcasts)); // Store the searched podcasts in Redux
    } catch (err) {
      dispatch(setError("Failed to fetch podcasts."));
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

  return (
    <div className="p-6">
      <div className="glass-effect rounded-xl p-8">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center space-x-5"
        >
          <div>
            <label htmlFor="search" className="sr-only">Search</label>
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

      {/* Render podcasts based on search query */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {(searchedPodcasts.length > 0 ? searchedPodcasts : initialPodcasts).map((podcast) => (
          <PodcastCard key={podcast._id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
