// import { useEffect, useState } from "react";
// import PodcastPlayer from "./AudioPlayer.jsx";
// import { useParams } from "react-router";
// import axiosInstance from "../utils/axios.js"; // Assuming you have your axios setup here

// export default function PodcastCardPlayer() {
//   const { id } = useParams(); // Retrieve podcast ID from URL params
//   const [podcast, setPodcast] = useState(null);
//   const [quizData, setQuizData] = useState(null);
//   const [summaryText, setSummaryText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPodcast = async () => {
//       try {
//         const podcastResponse = await axiosInstance.get(`/podcast/${id}`);
//         setPodcast(podcastResponse.data.podcast);

//         // Fetch data from LangFlow API (quiz, summary, and fact)
//         const transcript = podcastResponse.data.podcast.transcript; // Assuming you have the transcript field in the podcast data

//         // Fetch quiz
//         const quizResponse = await axiosInstance.post("/langflow/quiz", { transcript });
//         setQuizData(quizResponse.data.quiz);

//         // Fetch summary
//         const summaryResponse = await axiosInstance.post("/langflow/summary", { transcript });
//         setSummaryText(summaryResponse.data.summary);

//       } catch (err) {
//         setError("Failed to fetch data");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPodcast();
//   }, [id]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [quizIndex, setQuizIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isAnswered, setIsAnswered] = useState(false);

//   const slides = ["bg-red-400", "bg-blue-400", "quiz", "summary"];

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? slides.length - 1 : prevIndex - 1
//     );
//   };

//   const handleAnswerClick = (option) => {
//     if (!isAnswered) {
//       setSelectedOption(option);
//       setIsAnswered(true);
//     }
//   };

//   const handleNextQuestion = () => {
//     setSelectedOption(null);
//     setIsAnswered(false);
//     setQuizIndex((prev) => (prev + 1) % quizData.questions.length);
//   };

//   const question = quizData?.questions[quizIndex];

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
//       <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1 flex items-center justify-center bg-gray-700 p-4 rounded-lg">
//             <PodcastPlayer src={podcast.url} />
//           </div>

//           <div className="flex-1">
//             <h2 className="text-2xl font-bold text-white">{podcast.title}</h2>
//             <p className="text-gray-300 mt-2">{podcast.description}</p>
//           </div>
//         </div>

//         <div className="relative mt-6 w-full h-96 flex items-center overflow-hidden rounded-lg">
//           <button
//             onClick={prevSlide}
//             className="absolute left-2 z-10 bg-black/50 p-2 rounded-full"
//           >
//             ◀
//           </button>

//           <div
//             className={`w-full h-full flex items-center justify-center transition-all duration-500 rounded-lg ${
//               slides[currentIndex] !== "quiz" && slides[currentIndex] !== "summary"
//                 ? slides[currentIndex]
//                 : "bg-gray-900"
//             }`}
//           >
//             {slides[currentIndex] === "quiz" && quizData ? (
//               <div className="p-6 w-full">
//                 <h2 className="text-lg font-semibold mb-2">{question?.topic}</h2>
//                 <p className="text-xl mb-4">{question?.question}</p>

//                 <div className="space-y-2">
//                   {question?.options.map((option, index) => {
//                     let bgColor = "bg-gray-800";
//                     if (isAnswered) {
//                       if (option === question.correct) {
//                         bgColor = "bg-green-500";
//                       } else if (option === selectedOption) {
//                         bgColor = "bg-red-500";
//                       }
//                     }

//                     return (
//                       <button
//                         key={index}
//                         className={`w-full p-3 rounded-lg ${bgColor} transition-all`}
//                         onClick={() => handleAnswerClick(option)}
//                         disabled={isAnswered}
//                       >
//                         {option}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {isAnswered && (
//                   <button
//                     className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
//                     onClick={handleNextQuestion}
//                   >
//                     Next Question
//                   </button>
//                 )}
//               </div>
//             ) : slides[currentIndex] === "summary" && summaryText ? (
//               <div className="p-6 w-full h-full overflow-y-auto">
//                 <p className="px-10 py-3">{summaryText}</p>
//               </div>
//             ) : null}
//           </div>

//           <button
//             onClick={nextSlide}
//             className="absolute right-2 z-10 bg-black/50 p-2 rounded-full"
//           >
//             ▶
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import PodcastPlayer from "./AudioPlayer.jsx";
import { useParams } from "react-router";
import axiosInstance from "../utils/axios.js";

const quizData = {
  questions: [
    {
      topic: "Overhauling Your Finances",
      question: "What is step one in overhauling your finances?",
      options: [
        "A. Cutting back on expenses",
        "B. Clinically assess your finances",
        "C. Switching insurance providers",
        "D. Saving for holidays"
      ],
      correct: "B. Clinically assess your finances"
    },
    {
      topic: "Overhauling Your Finances",
      question: "Why are most budgets considered 'bump come'?",
      options: [
        "A. They focus on annual holidays",
        "B. They factor in weekly shopping",
        "C. They only look at a typical month's expenditure",
        "D. They don't include contact lenses expenses"
      ],
      correct: "C. They only look at a typical month's expenditure"
    },
    {
      topic: "Overhauling Your Finances",
      question: "What is the average payout for childcare tax credit?",
      options: [
        "A. £1,000",
        "B. £3,000",
        "C. £5,000",
        "D. £4,000"
      ],
      correct: "B. £3,000"
    },
    {
      topic: "Overhauling Your Finances",
      question: "What should you never do with your car insurance?",
      options: [
        "A. Combine comparison services",
        "B. Auto renew",
        "C. Switch providers",
        "D. Get cashback"
      ],
      correct: "B. Auto renew"
    },
    {
      topic: "Overhauling Your Finances",
      question: "When paying off credit card debts, which debts should you focus on first?",
      options: [
        "A. The lowest interest rate debts",
        "B. The highest interest rate debts",
        "C. The largest debts",
        "D. The smallest debts"
      ],
      correct: "B. The highest interest rate debts"
    },
    {
      topic: "Overhauling Your Finances",
      question: "Which technique involves setting up multiple accounts for different types of expenditures?",
      options: [
        "A. Budgeting",
        "B. Piggy banking",
        "C. Budget splitting",
        "D. Account stacking"
      ],
      correct: "B. Piggy banking"
    },
    {
      topic: "Overhauling Your Finances",
      question: "According to the transcript, how much can families typically save per year by overhauling their finances?",
      options: [
        "A. £500-£1000",
        "B. £1000-£2000",
        "C. £2000-£4000",
        "D. £1000-£3000"
      ],
      correct: "D. £1000-£3000"
    },
    {
      topic: "Overhauling Your Finances",
      question: "What is the first step to take if you regularly travel by train?",
      options: [
        "A. Get a season pass",
        "B. Auto renew tickets",
        "C. Use split ticketing",
        "D. Avoid traveling during peak hours"
      ],
      correct: "C. Use split ticketing"
    },
    {
      topic: "Overhauling Your Finances",
      question: "How much can you potentially save per year by switching to the cheapest online tariff for gas and electricity?",
      options: [
        "A. £200",
        "B. £300",
        "C. £400",
        "D. £500"
      ],
      correct: "B. £300"
    },
    {
      topic: "Overhauling Your Finances",
      question: "What is the 'four-step' strategy when dealing with existing credit card debts?",
      options: [
        "A. Lower interest rates, pay off highest interest debts first, stop borrowing, get help from counselling agencies",
        "B. Lower interest rates, pay off lowest interest debts first, switch providers, get help from a friend",
        "C. Auto renew credit cards, pay off smallest debts first, borrow more, get help from a bank",
        "D. Lower interest rates, increase borrowing, get cashback, avoid counselling agencies"
      ],
      correct: "A. Lower interest rates, pay off highest interest debts first, stop borrowing, get help from counselling agencies"
    }
  ]
};

const summaryText = "Overhauling your finances starts with assessing your spending versus earnings through a comprehensive budget, factoring in all expenses from daily coffees to annual holidays. By identifying pain-free savings, such as cutting down on childcare costs with tax credits, avoiding car insurance auto-renewals, managing credit card debt effectively, and using split ticketing for train travel, you can significantly reduce your expenses. Moreover, switching to the cheapest online tariff for gas and electricity can save hundreds. If you still find yourself spending more than you earn, it's essential to cut back on discretionary spending. The piggy banking technique, which involves setting up multiple accounts for different expenditures, can help you stick to your budget and ultimately achieve your financial goals."
export default function PodcastCardPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const slides = ["bg-red-400", "bg-blue-400", "quiz", "summary"];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  const { id } = useParams(); // Retrieve podcast ID from URL params
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const response = await axiosInstance.get(`/podcast/${id}`); // Fetch podcast by ID from API
        setPodcast(response.data.podcast);
      } catch (err) {
        setError("Failed to fetch podcast");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(podcast);
  // Destructure the podcast from state
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
              slides[currentIndex] !== "quiz" &&
              slides[currentIndex] !== "summary"
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
