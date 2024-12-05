import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    if (user) AuthService.setLogoutTimer(user.accessToken);
  }, [user]);

  const login = async (credentials) => {
    const user = await AuthService.login(credentials);
    setUser(user);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
