'use client';

import ArrowIcon from './icons/ArrowIcon';

type Props = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  icon?: boolean;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({
  text,
  size = 'medium',
  icon,
  active = false,
  disabled = false,
  onClick,
}: Props) => {
  const textSize = size === 'small' ? 'xs' : size === 'medium' ? 'md' : 'lg';

  return (
    <button
      className={`
        ${active ? 'border-sky-200' : ''}
        ${
          disabled
            ? 'cursor-not-allowed border-gray-200 text-gray-200'
            : 'border-sky-100 hover:border-sky-200 text-sky-800'
        } border-2 rounded-md py-2 px-6 font-bold tracking-wide flex items-center justify-center text-${textSize} max-w-fit`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="align-middle">{text}</span>
      {icon ? (
        <div className="ml-2">
          <ArrowIcon direction="right" />
        </div>
      ) : null}
    </button>
  );
};

export default Button;
