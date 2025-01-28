export interface Interest {
  id: string;
  title: string;
  subfields: string[];
}

export interface QuizQuestion {
  topic: string;
  question: string;
  options: string[];
  correct: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  showResults: boolean;
  answers: string[];
  showFeedback: boolean;
  selectedAnswer: string | null;
}