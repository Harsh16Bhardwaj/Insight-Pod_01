import React, { useState } from 'react';

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [recommendations, setRecommendations] = useState(8);
  const [audioQuality, setAudioQuality] = useState(9);
  const [userInterface, setUserInterface] = useState(7);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const ratingTexts = [
    'Select your rating',
    'Poor - Needs Improvement',
    'Fair - Could Be Better',
    'Good - Met Expectations',
    'Very Good - Exceeded Expectations',
    'Excellent - Outstanding!'
  ];

  const categories = [
    { emoji: '🎧', text: 'Audio Quality' },
    { emoji: '🤖', text: 'AI Recommendations' },
    { emoji: '👥', text: 'Community' },
    { emoji: '🎯', text: 'Content Relevance' },
    { emoji: '📱', text: 'User Interface' },
    { emoji: '🏆', text: 'Rewards System' }
  ];

  const handleCategoryClick = (category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  const handleSubmit = () => {
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg animate__animated animate__fadeInRight';
    successMessage.textContent = 'Thank you for your feedback!';
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      successMessage.classList.remove('animate__fadeInRight');
      successMessage.classList.add('animate__fadeOutRight');
      setTimeout(() => successMessage.remove(), 1000);
    }, 3000);
  };

  return (
    <div className="container h-auto mx-auto px-6 pb-20">
      <h2 className="text-4xl font-bold text-center mb-12">Your Feedback Matters</h2>
      
      <div className="glass-effect rounded-xl p-8 mb-8 animate__animated animate__fadeIn">
        <h3 className="text-2xl font-semibold mb-6">Overall Experience</h3>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`star-btn text-4xl transition-all duration-300 ${rating >= star ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-cyan-400 text-lg">{ratingTexts[rating]}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="glass-effect rounded-xl p-8 animate__animated animate__fadeIn animate__delay-1s">
          <h3 className="text-2xl font-semibold mb-6">Rate Our Features</h3>
          <div className="space-y-6">
            {[
              { label: 'Podcast Recommendations', value: recommendations, setter: setRecommendations },
              { label: 'Audio Quality', value: audioQuality, setter: setAudioQuality },
              { label: 'User Interface', value: userInterface, setter: setUserInterface }
            ].map((feature, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span>{feature.label}</span>
                  <span className="text-cyan-400">{feature.value}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={feature.value}
                  onChange={(e) => feature.setter(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-xl p-8 animate__animated animate__fadeIn animate__delay-2s">
          <h3 className="text-2xl font-semibold mb-6">What Did You Like Most?</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.text)}
                className={`feedback-category-btn p-4 rounded-lg glass-effect transition-all duration-300 
                          ${selectedCategories.has(category.text) ? 'selected' : ''}`}
              >
                {category.emoji} {category.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-xl p-8 mb-8 animate__animated animate__fadeIn animate__delay-3s">
        <h3 className="text-2xl font-semibold mb-6">Share Your Thoughts</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">What could we improve?</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 input-highlight transition-all duration-300"
              rows="4"
              placeholder="Share your suggestions..."
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">What features would you like to see?</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 input-highlight transition-all duration-300"
              rows="4"
              placeholder="Your feature requests..."
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-cyan-400 to-blue-500 px-12 py-4 rounded-xl text-lg font-semibold 
                 hover:opacity-90 transition-all duration-300 transform hover:scale-105 mx-auto block "
      >
        Submit Feedback
      </button>
    </div >
  );
}

export default FeedbackPage;