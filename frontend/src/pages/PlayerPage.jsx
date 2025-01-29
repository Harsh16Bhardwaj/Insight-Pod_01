import React, { useState, useRef } from 'react';
import PodcastCard from '../components/Card';

function PlayerPage() {
  const [progress, setProgress] = useState(45);
  const progressBarRef = useRef(null);

  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setProgress(Math.min(100, Math.max(0, percentage)));
  };

  return (
    <div className="container mx-auto px-6">
      <div className="glass-effect rounded-xl p-8">
        <PodcastCard/>

      </div>

      <div className="glass-effect rounded-xl p-8 mt-8">
        <h3 className="text-2xl font-bold mb-4">Episode Notes</h3>
        <div className="prose text-gray-300">
          <p>In this episode, we explore the revolutionary impact of AI in healthcare...</p>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;