import React, { useState, useRef, useEffect } from 'react';
import PodcastCard from '../components/Card'; // Assuming you have a PodcastCard component

function PlayerPage() {
  const [progress, setProgress] = useState(45);
  const [searchQuery, setSearchQuery] = useState('');
  const progressBarRef = useRef(null);


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

      <div className="glass-effect rounded-xl p-8 mt-8">
        <h3 className="text-2xl font-bold mb-4">Episode Notes</h3>
        <div className="prose text-gray-300">
          <p>In this episode, we explore the revolutionary impact of AI in healthcare...</p>
        </div>
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
