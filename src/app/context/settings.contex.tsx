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
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
};

const initialState: State = {
  isTimed: false,
  setIsTimed: (): boolean => false,
  categoryId: 9,
  setCategoryId: (): number => 9,
};

export const SettingsContext = createContext<State>(initialState);

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(9);

  return (
    <SettingsContext.Provider
      value={{
        isTimed,
        setIsTimed,
        categoryId,
        setCategoryId,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
