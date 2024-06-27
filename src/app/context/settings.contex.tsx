'use client';

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type State = {
  isTimed: boolean;
  setIsTimed: Dispatch<SetStateAction<boolean>>;
};

const initialState: State = {
  isTimed: false,
  setIsTimed: (): boolean => false,
};

export const SettingsContext = createContext<State>(initialState);

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTimed, setIsTimed] = useState<boolean>(false);

  return (
    <SettingsContext.Provider
      value={{
        isTimed,
        setIsTimed,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
