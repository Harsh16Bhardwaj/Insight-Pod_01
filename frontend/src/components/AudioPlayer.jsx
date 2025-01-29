import React, { useState, useRef } from "react";

const PodcastPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const seekAudio = (e) => {
    audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80 mx-auto mt-10">
      <h2 className="text-lg font-bold mb-2">🎙 Podcast Episode</h2>
      <p className="text-sm text-gray-400">Episode 1: The Future of AI</p>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={togglePlay}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <input
          type="range"
          value={progress}
          onChange={seekAudio}
          className="w-full"
          min="0"
          max="100"
        />
      </div>

      <audio ref={audioRef} onTimeUpdate={updateProgress}>
        <source
          src="https://res.cloudinary.com/dikc4f9ip/video/upload/v1738098168/audio_1738098156339.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default PodcastPlayer;