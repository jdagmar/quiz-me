import { useEffect } from 'react';
import { useQuizContext } from '../context/quiz.context';

type Props = {
  shouldClearTimer: boolean;
};

const Timer = ({ shouldClearTimer }: Props) => {
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
  }, [setCurrentQuestion, currentQuestion, shouldClearTimer]);

  return (
    <div className="bg-gray-200 rounded-md">
      <div
        key={currentQuestion.index}
        className={`${
          !shouldClearTimer &&
          currentQuestion.timer !== undefined &&
          currentQuestion.timer === 0
            ? 'bg-red-700'
            : shouldClearTimer
            ? 'bg-gray-200'
            : 'bg-sky-800'
        }  h-2.5 rounded-md ${
          !shouldClearTimer ? 'animate-[empty_30s_linear_1s]' : ''
        } `}
      ></div>
    </div>
  );
};

export default Timer;
