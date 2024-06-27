import React from 'react';

type Props = {
  type: 'h1' | 'h2';
  text: string;
};

const Heading = ({ type, text }: Props) => {
  const commonClasses = 'tracking-wide';
  switch (type) {
    case 'h1':
      return (
        <h1
          className={`font-semibold text-6xl font-sans mb-6 text-sky-800 ${commonClasses}`}
        >
          {text}
        </h1>
      );
    case 'h2':
      return <h2 className={`text-4xl mb-4 ${commonClasses}`}>{text}</h2>;
  }
};

export default Heading;
