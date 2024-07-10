import { Answer as AnswerType } from '../types/quiz';
import CheckIcon from './icons/CheckIcon';
import CloseIcon from './icons/CloseIcon';

type Props = {
  isSelected: boolean;
  answer: AnswerType;
  isChoosable: boolean;
  onClick: () => void;
  answerIsChosen: boolean;
};

const Answer = ({
  isSelected,
  answer,
  isChoosable,
  onClick,
  answerIsChosen,
}: Props) => {
  const isAnswerCorrect = answerIsChosen && answer.isCorrect;
  return (
    <button
      className={`${
        isSelected && answer.isCorrect
          ? 'border-green-700 bg-transparent'
          : isSelected && !answer.isCorrect
          ? 'border-red-700 bg-transparent'
          : 'border-gray-200 '
      } 
      ${
        isChoosable &&
        'bg-orange-200 border-orange-200 hover:bg-orange-300 hover:border-orange-300'
      }
      border-2 rounded-md px-2 py-3 w-full flex items-center justify-center`}
      onClick={onClick}
      disabled={answerIsChosen}
    >
      <span>{answer.answer}</span>
      <span
        className={`${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}
      >
        {isAnswerCorrect ? (
          <CheckIcon />
        ) : !isAnswerCorrect && isSelected ? (
          <CloseIcon />
        ) : null}
      </span>
    </button>
  );
};

export default Answer;
