import { ChangeEvent } from 'react';

type Props = {
  value: string | number;
  options: { id: string | number; name: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ value, options, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-transparent border-2 border-sky-100 text-sky-800 text-sm rounded-md block w-full py-2 px-6 font-bold tracking-wide"
    >
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
