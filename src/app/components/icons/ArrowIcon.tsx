type Props = {
  direction: 'right' | 'left' | 'down' | 'up';
};

const ArrowIcon = ({ direction }: Props) => {
  let classNames: string = '';

  switch (direction) {
    case 'left':
      classNames = 'rotate-180';
      break;
    case 'down':
      classNames = 'rotate-90';
      break;
    case 'up':
      classNames = '-rotate-90';
      break;
    default:
      // Will return right arrow
      classNames = 'rotate-0';
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 -960 960 960"
      className={classNames}
    >
      <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" />
    </svg>
  );
};

export default ArrowIcon;
