import React, { useState, useRef, useEffect } from 'react';
import PodcastCard from '../components/card'; // Assuming you have a PodcastCard component

function PlayerPage() {
  const [progress, setProgress] = useState(45);
  const [searchQuery, setSearchQuery] = useState('');
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const progressBarRef = useRef(null);

  // Fetch podcasts from API based on search query
  const fetchPodcasts = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.podcast.com/search?q=${query}`); // Replace with your actual API
      const data = await response.json();
      setPodcasts(data.results); // Assuming data has a `results` field with podcasts
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPodcasts(searchQuery); // Trigger podcast search on submit
  };

  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setProgress(Math.min(100, Math.max(0, percentage)));
  };

  useEffect(() => {
    if (searchQuery) {
      fetchPodcasts(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-6">
      <div className="glass-effect rounded-xl p-8">
        <form onSubmit={handleSubmit} className="flex justify-center items-center space-x-5">
          <div className="">
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
          <button type="submit" className="p-2 px-6 bg-gray-800 rounded-xl">
            Go
          </button>
        </form>
      </div>

      <div className="glass-effect rounded-xl p-8 mt-8">
        <h3 className="text-2xl font-bold mb-4">Episode Notes</h3>
        <div className="prose text-gray-300">
          <p>In this episode, we explore the revolutionary impact of AI in healthcare...</p>
        </div>
      </div>

      <div className="glass-effect rounded-xl p-8 mt-8">
        <h3 className="text-2xl font-bold mb-4">Podcasts</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.length > 0 ? (
              podcasts.map((podcast, index) => (
                <PodcastCard key={index} podcast={podcast} />
              ))
            ) : (
              <p>No podcasts found</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8">
        <div
          ref={progressBarRef}
          className="w-full bg-gray-700 rounded-full h-2 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            style={{ width: `${progress}%` }}
            className="bg-blue-500 h-2 rounded-full"
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>0:00</span>
          <span>{`${Math.floor(progress)}%`}</span>
          <span>End</span>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
