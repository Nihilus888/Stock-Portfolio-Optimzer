import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Change null to initial user state if needed
  const [token, setToken] = useState(localStorage.getItem('token')); // Store token in state

  const login = (userData) => {
    setUser(userData); // Set the user state when logging in
    setToken(userData.access); // Store the access token
    localStorage.setItem('token', userData.access); // Store the token in local storage
  };

  const logout = () => {
    setUser(null); // Clear the user state when logging out
    setToken(null); // Clear the token from state
    localStorage.removeItem('token'); // Remove the token from local storage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
