'use client';

import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Heading from '../components/Heading';
import Select from '../components/Select';
import { useSettingsContext } from '../context/settings.contex';
import { useEffect, useState } from 'react';
import { fetchQuizCategories } from '../actions';
import { useAppContext } from '../context/app.context';
import { Category } from '../types/quiz';

const Options = () => {
  const { isTimed, setIsTimed, categoryId, setCategoryId } =
    useSettingsContext();
  const { error, setError } = useAppContext();
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);

  const toggleTime = (value: boolean) => setIsTimed(value);

  useEffect(() => {
    const getOptions = async () => {
      const result = await fetchQuizCategories();

      if (result.type === 'SUCCESS') {
        setCategoryOptions(result.categories);
      } else {
        setError({ type: result.type });
      }
    };

    getOptions();
  }, [setError]);

  return (
    <>
      <Heading text="Options" type="h2" />
      <div className="flex items-center justify-between">
        <p className="mr-2">Time limit each question</p>
        <div className=" grid grid-cols-2 gap-2">
          <Button
            active={isTimed}
            text="Enable"
            size="small"
            onClick={() => toggleTime(true)}
          />
          <Button
            active={!isTimed}
            text="Disable"
            size="small"
            onClick={() => toggleTime(false)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="mr-2">Quiz category</p>
        <div>
          {error?.type === 'CATEGORY_FAIL' ? (
            <p className="italic">Could not load categories</p>
          ) : (
            <Select
              value={categoryId}
              options={categoryOptions}
              onChange={e => setCategoryId(Number(e.target.value))}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center mt-24">
        <Button text="Back" onClick={() => router.push('/')} />
      </div>
    </>
  );
};

export default Options;
