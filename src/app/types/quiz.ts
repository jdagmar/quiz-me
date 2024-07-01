export type Quiz = {
  length: number;
  items: QuizItem[];
};

export type QuizItem = {
  id: string;
  category: string;
  question: string;
  answers: Answer[];
};

export type Answer = {
  id: string;
  quizItemId: string;
  answer: string;
  isCorrect: boolean;
};

export type CurrentQuestion = {
  quizItemId?: string;
  index: number;
  selected?: Answer;
  timer?: number;
};

export type Category = {
  id: number;
  name: string;
};
