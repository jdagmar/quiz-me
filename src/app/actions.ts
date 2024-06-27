'use server';

import { ApiResponse, Quiz } from './types';
import { v4 as uuidv4 } from 'uuid';

export const fetchQuiz = async (): Promise<Quiz> => {
  // TODO: error handling
  const res = await fetch(
    'https://opentdb.com/api.php?amount=10&category=12&encode=url3986'
  );
  const data = await res.json();

  const results: ApiResponse[] = data.results;

  const items = results.map(question => {
    const quizItemId = uuidv4();

    return {
      id: quizItemId,
      category: question.category,
      question: decodeURIComponent(question.question),
      answers: [question.correct_answer, ...question.incorrect_answers].map(
        answer => ({
          id: uuidv4(),
          quizItemId,
          answer: decodeURIComponent(answer),
          isCorrect: answer === question.correct_answer,
        })
      ),
    };
  });

  return {
    length: items.length,
    items,
  };
};
