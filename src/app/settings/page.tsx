'use client';

import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { useSettingsContext } from '../context/settings.contex';

const Settings = () => {
  const { isTimed, setIsTimed } = useSettingsContext();
  const router = useRouter();

  const toggleTime = (value: boolean) => setIsTimed(value);

  return (
    <>
      <Heading text="Settings" type="h2" />
      <div className="flex items-center justify-between">
        <p className="mr-2">Limit the time questions can be answered</p>
        <div className="grid grid-cols-2 gap-2">
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

      <div className="flex justify-center mt-24">
        <Button text="Back" onClick={() => router.push('/')} />
      </div>
    </>
  );
};

export default Settings;
