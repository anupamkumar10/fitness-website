import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { setAuthToken, setRefreshToken, setUser, removeTokens, getUser } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUserState(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, refreshToken, ...userData } = response.data;
      
      setAuthToken(token);
      setRefreshToken(refreshToken);
      setUser(userData);
      setUserState(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Login failed. Please check your connection and try again.';
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, refreshToken, ...user } = response.data;
      
      setAuthToken(token);
      setRefreshToken(refreshToken);
      setUser(user);
      setUserState(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Signup failed. Please check your connection and try again.';
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const logout = () => {
    removeTokens();
    setUserState(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    setUserState(userData);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

