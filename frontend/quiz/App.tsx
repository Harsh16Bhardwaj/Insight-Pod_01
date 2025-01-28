import React, { useState } from 'react';
import InterestCard from './components/InterestCard';
import Quiz from './components/Quiz';
import { interests } from './data/interests';

function App() {
  const [activeSubfield, setActiveSubfield] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const toggleSubfields = (id: string) => {
    setActiveSubfield(activeSubfield === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white font-sans p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Explore Your Interests</h1>
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {showQuiz ? 'Show Interests' : 'Take Quiz'}
          </button>
        </div>

        {showQuiz ? (
          <Quiz />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest) => (
              <InterestCard
                key={interest.id}
                {...interest}
                isActive={activeSubfield === interest.id}
                onToggle={() => toggleSubfields(interest.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;