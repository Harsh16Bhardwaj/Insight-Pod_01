import { useState } from "react";
import PodcastPlayer from './AudioPlayer.jsx'
const quizData = {
  questions: [
    {
      topic: "The Age of Trees",
      question: "How long can some trees live?",
      options: [
        "A. A few decades",
        "B. A few centuries",
        "C. Thousands of years",
        "D. Millions of years"
      ],
      correct: "C. Thousands of years"
    },
    {
      topic: "The Deepest Ocean",
      question: "Which is the deepest ocean?",
      options: [
        "A. Atlantic Ocean",
        "B. Indian Ocean",
        "C. Arctic Ocean",
        "D. Pacific Ocean"
      ],
      correct: "D. Pacific Ocean"
    }
  ]
};

const summaryText = "The transcript discusses the fascinating world of trees, exploring their ancient yet fresh appeal, their role in ecosystems, and the impact they have on our lives, from physical benefits to emotional nourishment. Trees are not just beautiful to look at; they're crucial to the health of the planet, providing oxygen, regulating temperature, and improving air quality. They teach us patience, resilience, and interconnectedness with nature.";

export default function PodcastCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const slides = ["bg-red-400", "bg-blue-400", "quiz", "summary"];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const question = quizData.questions[quizIndex];

  const handleAnswerClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizIndex((prev) => (prev + 1) % quizData.questions.length);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex items-center justify-center bg-gray-700 p-4 rounded-lg">
            {/* <audio controls className="w-full">
              <source
                src="https://res.cloudinary.com/dikc4f9ip/video/upload/v1738103020/audio_1738103011791.mp3"
                type="audio/mp3"
              />
              Your browser does not support the audio element.
            </audio> */}
            <PodcastPlayer
              src="https://res.cloudinary.com/dikc4f9ip/video/upload/v1738103020/audio_1738103011791.mp3"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">
              The Future of Technology
            </h2>
            <p className="text-gray-300 mt-2">
              In this episode, we discuss the advancements in AI, blockchain, and
              space exploration, and how they are shaping the future of humanity.
            </p>
          </div>
        </div>

        <div className="relative mt-6 w-full h-96 flex items-center overflow-hidden rounded-lg">
          <button
            onClick={prevSlide}
            className="absolute left-2 z-10 bg-black/50 p-2 rounded-full"
          >
            ◀
          </button>

          <div
            className={`w-full h-full flex items-center justify-center transition-all duration-500 rounded-lg ${
              slides[currentIndex] !== "quiz" && slides[currentIndex] !== "summary"
                ? slides[currentIndex]
                : "bg-gray-900"
            }`}
          >
            {slides[currentIndex] === "quiz" ? (
              <div className="p-6 w-full">
                <h2 className="text-lg font-semibold mb-2">{question.topic}</h2>
                <p className="text-xl mb-4">{question.question}</p>

                <div className="space-y-2">
                  {question.options.map((option, index) => {
                    let bgColor = "bg-gray-800";
                    if (isAnswered) {
                      if (option === question.correct) {
                        bgColor = "bg-green-500";
                      } else if (option === selectedOption) {
                        bgColor = "bg-red-500";
                      }
                    }

                    return (
                      <button
                        key={index}
                        className={`w-full p-3 rounded-lg ${bgColor} transition-all`}
                        onClick={() => handleAnswerClick(option)}
                        disabled={isAnswered}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </button>
                )}
              </div>
            ) : slides[currentIndex] === "summary" ? (
              <div className="p-6 w-full h-full overflow-y-auto">
                <p className="px-10 py-3">{summaryText}</p>
              </div>
            ) : null}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-2 z-10 bg-black/50 p-2 rounded-full"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
