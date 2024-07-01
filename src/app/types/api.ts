import { Category, Quiz } from './quiz';

export type QuizApiResponse = {
  category: string;
  correct_answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  incorrect_answers: string[];
  question: string;
  type: 'multiple' | 'boolean';
};

export type CategoryApiResponse = {
  trivia_categories: {
    id: number;
    name: string;
  }[];
};

export type FetchError = {
  type: 'CATEGORY_FAIL' | 'QUIZ_FAIL';
};

export type CategoryResponse = {
  type: 'SUCCESS';
  categories: Category[];
};

export type QuizResponse = {
  type: 'SUCCESS';
  quiz: Quiz;
};
