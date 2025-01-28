import React, { useState } from 'react';
import { QuizQuestion, QuizState } from '../types';
import { questions } from '../data/questions';
import { TreesIcon as TreeIcon, RefreshCwIcon, CheckCircle2Icon, XCircleIcon } from 'lucide-react';

const Quiz: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    showResults: false,
    answers: [],
    showFeedback: false,
    selectedAnswer: null,
  });

  const restartQuiz = () => {
    setState({
      currentQuestion: 0,
      score: 0,
      showResults: false,
      answers: [],
      showFeedback: false,
      selectedAnswer: null,
    });
  };

  const selectOption = (option: string) => {
    if (state.showFeedback) return; // Prevent selecting while showing feedback

    const isCorrect = option === questions[state.currentQuestion].correct;
    setState({
      ...state,
      showFeedback: true,
      selectedAnswer: option,
      score: isCorrect ? state.score + 1 : state.score,
    });

    // Move to next question after 2 seconds
    setTimeout(() => {
      const newAnswers = [...state.answers, option];
      
      if (state.currentQuestion === questions.length - 1) {
        setState(prev => ({
          ...prev,
          showResults: true,
          answers: newAnswers,
          showFeedback: false,
          selectedAnswer: null,
        }));
      } else {
        setState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          answers: newAnswers,
          showFeedback: false,
          selectedAnswer: null,
        }));
      }
    }, 2000);
  };

  const currentQuestion: QuizQuestion = questions[state.currentQuestion];

  const getOptionClassName = (option: string) => {
    if (!state.showFeedback) {
      return "w-full text-left p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200";
    }

    if (option === currentQuestion.correct) {
      return "w-full text-left p-4 rounded-lg bg-green-500/20 border border-green-500 transition-all duration-200";
    }

    if (option === state.selectedAnswer && option !== currentQuestion.correct) {
      return "w-full text-left p-4 rounded-lg bg-red-500/20 border border-red-500 transition-all duration-200";
    }

    return "w-full text-left p-4 rounded-lg bg-white/5 border border-white/10 opacity-50 transition-all duration-200";
  };

  if (state.showResults) {
    return (
      <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>
        <div className="text-center mb-8">
          <p className="text-4xl font-bold mb-2">{state.score} / {questions.length}</p>
          <p className="text-lg">
            {state.score === questions.length 
              ? "Perfect score! You're a tree expert! 🌳" 
              : state.score >= questions.length / 2 
                ? "Good job! You know your trees well! 🌱"
                : "Keep learning about trees! 🍃"}
          </p>
        </div>
        <button
          onClick={restartQuiz}
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <RefreshCwIcon size={20} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-8 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <TreeIcon className="text-green-400" size={28} />
        <h2 className="text-2xl font-bold text-center">Tree Knowledge Quiz</h2>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Question {state.currentQuestion + 1}/{questions.length}</span>
          <span>Score: {state.score}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((state.currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-green-300 mb-2">{currentQuestion.topic}</h3>
        <p className="text-xl mb-6">{currentQuestion.question}</p>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectOption(option)}
              disabled={state.showFeedback}
              className={getOptionClassName(option)}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {state.showFeedback && option === currentQuestion.correct && (
                  <CheckCircle2Icon className="text-green-500" size={20} />
                )}
                {state.showFeedback && option === state.selectedAnswer && option !== currentQuestion.correct && (
                  <XCircleIcon className="text-red-500" size={20} />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;