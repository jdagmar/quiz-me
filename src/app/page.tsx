'use client';

import { fetchQuiz } from './actions';
import Button from './components/Button';
import { useQuizContext } from './context/quiz.context';
import { useRouter } from 'next/navigation';
import { useSettingsContext } from './context/settings.contex';
import Timer from './components/Timer';
import { useAppContext } from './context/app.context';
import { Answer } from './types/quiz';

const Home = () => {
  const {
    quiz,
    setQuiz,
    currentQuestion,
    setCurrentQuestion,
    answeredQuestions,
    setAnsweredQuestions,
  } = useQuizContext();
  const { isTimed, categoryId } = useSettingsContext();
  const { error, setError } = useAppContext();
  const router = useRouter();

  const startQuiz = async () => {
    const result = await fetchQuiz(categoryId);

    if (result.type === 'SUCCESS') {
      setQuiz(result.quiz);
      setCurrentQuestion({
        quizItemId: result.quiz.items[0].id,
        index: 0,
        timer: 30,
      });
    } else {
      setError({ type: result.type });
    }
  };

  const pickAnswer = (answer: Answer): void => {
    setAnsweredQuestions([...answeredQuestions, answer]);
    setCurrentQuestion({ ...currentQuestion, selected: answer });
  };

  const nextQuestion = () => {
    const index = currentQuestion.index + 1;
    setCurrentQuestion({
      quizItemId: quiz.items[index].id,
      index,
      selected: undefined,
      timer: 30,
    });
  };

  const isTimeUp =
    currentQuestion.timer !== undefined && currentQuestion.timer === 0;
  const hasAnsweredCurrentQuestion =
    answeredQuestions.filter(
      answer => answer.quizItemId === currentQuestion.quizItemId
    ).length > 0;

  const isQuestionFinished = (): boolean => {
    if (isTimed && isTimeUp) {
      return true;
    }

    return hasAnsweredCurrentQuestion;
  };

  return (
    <>
      {quiz.length === 0 ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-2">
            <Button
              text="Start"
              disabled={false}
              onClick={() => startQuiz()}
            ></Button>
            <Button text="Settings" onClick={() => router.push('/settings')} />
          </div>
        </div>
      ) : (
        <>
          {isTimed && <Timer />}
          <div className="bg-sky-100 p-8 text-2xl my-3 rounded-md text-center">
            <p>
              {quiz.length > 0 && quiz.items[currentQuestion.index].question}
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-2 mb-6">
            {quiz.items[currentQuestion.index].answers.map(answer => (
              <li key={answer.answer}>
                <button
                  className={`${
                    currentQuestion.selected?.id === answer.id &&
                    answer.isCorrect
                      ? 'border-green-700 bg-transparent'
                      : currentQuestion.selected?.id === answer.id &&
                        !answer.isCorrect
                      ? 'border-red-700 bg-transparent'
                      : 'bg-orange-200 border-orange-200'
                  } 
                  ${
                    (isTimed ? !isTimeUp : !currentQuestion.selected) &&
                    'hover:bg-orange-300 hover:border-orange-300'
                  }
                  border-2 rounded-md px-2 py-3 w-full`}
                  onClick={() => pickAnswer(answer)}
                  disabled={isQuestionFinished()}
                >
                  {answer.answer}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            {quiz.items.at(-1)?.id !== currentQuestion.quizItemId ? (
              <Button
                text="Next"
                icon={true}
                onClick={() => nextQuestion()}
                disabled={!isQuestionFinished()}
              ></Button>
            ) : (
              <Button
                icon={true}
                text="See result"
                disabled={!isQuestionFinished()}
                onClick={() => router.push('/results')}
              ></Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
