import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [showAuth, setShowAuth] = useState(false);

  const dispatchAuth = (state) => setShowAuth(state);

  return (
    <AuthContext.Provider value={{ showAuth, dispatchAuth }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};