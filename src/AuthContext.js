import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize auth state from localStorage
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser).user);
      setAccessToken(storedToken);
    }
  }, []);

  const login = (userData, tokens) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    setUser(userData.user);
    setAccessToken(tokens.access);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setAccessToken(null);
    navigate('/login-page');
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};