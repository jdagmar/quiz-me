'use server';

import { v4 as uuidv4 } from 'uuid';
import {
  CategoryApiResponse,
  CategoryResponse,
  FetchError,
  QuizApiResponse,
  QuizResponse,
} from './types/api';

export const fetchQuiz = async (
  categoryId: number
): Promise<QuizResponse | FetchError> => {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&encode=url3986`
    );
    const data = await res.json();

    const results: QuizApiResponse[] = data.results;

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
      type: 'SUCCESS',
      quiz: {
        length: items.length,
        items,
      },
    };
  } catch {
    return { type: 'QUIZ_FAIL' };
  }
};

export const fetchQuizCategories = async (): Promise<
  CategoryResponse | FetchError
> => {
  try {
    const res = await fetch('https://opentdb.com/api_category.php');
    const data: CategoryApiResponse = await res.json();

    return {
      type: 'SUCCESS',
      categories: data.trivia_categories,
    };
  } catch {
    return { type: 'CATEGORY_FAIL' };
  }
};
