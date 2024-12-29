import React, { createContext, useContext, useState } from 'react';
import LoadingSpinner from '../global/LoadingSpinner';

const LoadingContext = createContext(undefined);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatchLoader = (state) => setIsLoading(state);

  return (
    <LoadingContext.Provider value={{ isLoading, dispatchLoader }}>
      { isLoading ? <LoadingSpinner/> : children }
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};