'use client';

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Answer, CurrentQuestion, Quiz } from '../types';

type State = {
  quiz: Quiz;
  setQuiz: Dispatch<SetStateAction<Quiz>>;
  currentQuestion: CurrentQuestion;
  setCurrentQuestion: Dispatch<SetStateAction<CurrentQuestion>>;
  answeredQuestions: Answer[];
  setAnsweredQuestions: Dispatch<SetStateAction<Answer[]>>;
};

const initialState: State = {
  quiz: { length: 0, items: [] },
  setQuiz: (): Quiz => ({ length: 0, items: [] }),
  currentQuestion: {
    quizItemId: undefined,
    index: 0,
    selected: undefined,
    timer: undefined,
  },
  setCurrentQuestion: (): CurrentQuestion => ({
    quizItemId: undefined,
    index: 0,
    selected: undefined,
    timer: undefined,
  }),
  answeredQuestions: [],
  setAnsweredQuestions: (): Answer[] => [],
};

export const QuizContext = createContext<State>(initialState);

export const QuizContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [quiz, setQuiz] = useState<Quiz>({ length: 0, items: [] });
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    quizItemId: undefined,
    index: 0,
    selected: undefined,
    timer: undefined,
  });
  const [answeredQuestions, setAnsweredQuestions] = useState<Answer[]>([]);

  return (
    <QuizContext.Provider
      value={{
        quiz,
        setQuiz,
        currentQuestion,
        setCurrentQuestion,
        answeredQuestions,
        setAnsweredQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => useContext(QuizContext);
