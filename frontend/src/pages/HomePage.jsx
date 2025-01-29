import React from "react";
import img from '../public/logo1.png'

function HomePage() {
  const featuredPodcasts = [
    {
      title: "AI Revolution",
      description: "Exploring the latest in artificial intelligence",
      image: "https://source.unsplash.com/random/400x200?ai",
    },
    {
      title: "Tech Insights",
      description: "Deep dives into emerging technologies",
      image: "https://source.unsplash.com/random/400x200?tech",
    },
    {
      title: "Future Forward",
      description: "Predicting tomorrow's innovations",
      image: "https://source.unsplash.com/random/400x200?future",
    },
  ];

  return (
    <div className="container mx-auto px-6 mt-20">
      <div className="text-center mb-20">
        <div className="flex justify-center items-center">
          <img className="w-28 -mr-1 "  src={img} alt="" />
          <h1 className="text-7xl mb-5 font-bold" style={{fontFamily:"Manrope"}} >InsighPod</h1>
        </div>
        <h1 className="text-4xl font-medium text-orange-100">Discover. Learn. Grow.</h1>
        <p className="text-xl text-gray-400 mb-12">
          Your AI-powered podcast journey starts here
        </p>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-12 py-4 rounded-xl text-lg font-semibold">
          Start Listening Now
        </button>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Featured Podcasts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredPodcasts.map((podcast, index) => (
            <div key={index} className="glass-effect rounded-xl p-6">
              <img
                src={podcast.image}
                alt={podcast.title}
                className="rounded-lg mb-4 w-full"
              />
              <h3 className="text-xl font-semibold mb-2">{podcast.title}</h3>
              <p className="text-gray-300">{podcast.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
