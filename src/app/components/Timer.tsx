import { useEffect } from 'react';
import { useQuizContext } from '../context/quiz.context';

const Timer = () => {
  const { currentQuestion, setCurrentQuestion } = useQuizContext();

  useEffect(() => {
    if (currentQuestion.timer && currentQuestion.timer > 0) {
      const timeout = setTimeout(() => {
        return setCurrentQuestion({
          ...currentQuestion,
          timer: currentQuestion.timer ? currentQuestion.timer - 1 : undefined,
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [setCurrentQuestion, currentQuestion]);

  return (
    <div className="bg-gray-200 rounded-md">
      <div
        key={currentQuestion.index}
        className={`${
          currentQuestion.timer !== undefined && currentQuestion.timer === 0
            ? 'bg-red-700'
            : 'bg-sky-800'
        }  h-2.5 rounded-md animate-[empty_30s_linear_1s]`}
      ></div>
    </div>
  );
};

export default Timer;
