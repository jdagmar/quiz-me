'use client';

import { useEffect } from 'react';
import Button from '../components/Button';
import CheckIcon from '../components/icons/CheckIcon';
import CloseIcon from '../components/icons/CloseIcon';
import { useQuizContext } from '../context/quiz.context';
import { useRouter } from 'next/navigation';

const Results = () => {
  const { quiz, setQuiz, answeredQuestions } = useQuizContext();
  const router = useRouter();

  useEffect(() => {
    if (quiz.length === 0) {
      router.push('/');
    }
  }, [quiz, answeredQuestions, router]);

  const isAnswerCorrect = (quizItemId: string): boolean => {
    return (
      answeredQuestions.filter(
        answer => answer.quizItemId === quizItemId && answer.isCorrect
      ).length > 0
    );
  };

  return (
    <>
      <h2 className="text-4xl">
        Score {answeredQuestions.filter(answer => answer.isCorrect).length}/
        {quiz.length}
      </h2>
      <ol type="1" className="mt-2 list-inside list-decimal">
        {quiz.items.map(item => {
          return (
            <li key={item.id} className="mb-1">
              <span>{item.question}</span>
              <span
                className={`${
                  isAnswerCorrect(item.id) ? 'text-green-700' : 'text-red-700'
                } inline-block align-top ml-1`}
              >
                {isAnswerCorrect(item.id) ? <CheckIcon /> : <CloseIcon />}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="flex justify-center mt-4">
        <Button
          text="New quiz"
          onClick={() => setQuiz({ length: 0, items: [] })}
        />
      </div>
    </>
  );
};

export default Results;
