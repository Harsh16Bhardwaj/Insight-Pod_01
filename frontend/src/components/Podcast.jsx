import { useEffect, useState } from "react";
import PodcastPlayer from "./AudioPlayer.jsx";
import { useParams } from "react-router";
import axiosInstance from "../utils/axios.js"; // Assuming you have your axios setup here

export default function PodcastCardPlayer() {
  const { id } = useParams(); // Retrieve podcast ID from URL params
  const [podcast, setPodcast] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [summaryText, setSummaryText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const podcastResponse = await axiosInstance.get(`/podcast/${id}`);
        setPodcast(podcastResponse.data.podcast);

        // Fetch data from LangFlow API (quiz, summary, and fact)
        const transcript = podcastResponse.data.podcast.transcript; // Assuming you have the transcript field in the podcast data

        // Fetch quiz
        const quizResponse = await axiosInstance.post("/langflow/quiz", { transcript });
        setQuizData(quizResponse.data.quiz);

        // Fetch summary
        const summaryResponse = await axiosInstance.post("/langflow/summary", { transcript });
        setSummaryText(summaryResponse.data.summary);

      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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

  const question = quizData?.questions[quizIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex items-center justify-center bg-gray-700 p-4 rounded-lg">
            <PodcastPlayer src={podcast.url} />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{podcast.title}</h2>
            <p className="text-gray-300 mt-2">{podcast.description}</p>
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
            {slides[currentIndex] === "quiz" && quizData ? (
              <div className="p-6 w-full">
                <h2 className="text-lg font-semibold mb-2">{question?.topic}</h2>
                <p className="text-xl mb-4">{question?.question}</p>

                <div className="space-y-2">
                  {question?.options.map((option, index) => {
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
            ) : slides[currentIndex] === "summary" && summaryText ? (
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
