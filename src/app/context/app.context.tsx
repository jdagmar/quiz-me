'use client';

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { FetchError } from '../types/api';

type State = {
  error?: FetchError;
  setError: Dispatch<SetStateAction<FetchError | undefined>>;
};

const initialState: State = {
  error: undefined,
  setError: (): FetchError | undefined => undefined,
};

export const appContext = createContext<State>(initialState);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [error, setError] = useState<FetchError | undefined>(undefined);

  return (
    <appContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => useContext(appContext);
