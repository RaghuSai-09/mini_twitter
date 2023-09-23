import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isSigned, setIsSigned] = useState(
    localStorage.getItem('isSigned') === 'true'
  );

  const login = () => {
    setIsSigned(true);
    localStorage.setItem('isSigned', 'true');
  };
  const logout = () => {
    setIsSigned(false);
    localStorage.removeItem('isSigned');
  };
  useEffect(() => {
    const storedIsSigned = localStorage.getItem('isSigned');
    if (storedIsSigned) {
      setIsSigned(storedIsSigned === 'true');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isSigned, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
