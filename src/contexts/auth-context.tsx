"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// The list of allowed users and password
const allowedEmails = [
  'admin@company.com',
  'manager@company.com',
  'support@company.com',
  'dev@company.com',
];
const adminPassword = 'admin123';

// Create the Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start true to check localStorage
  const [error, setError] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // Set client flag to true after hydration
    setIsClient(true);
    
    // Check for saved authentication state on initial load
    const savedAuth = localStorage.getItem('botconfig_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (allowedEmails.includes(authData.email)) {
          setIsAuthenticated(true);
        }
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem('botconfig_auth');
      }
    }
    setIsLoading(false); // Finished initial check
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    if (!allowedEmails.includes(email.toLowerCase())) {
      setError('Access denied. Your email is not authorized.');
      setIsLoading(false);
      throw new Error('Unauthorized email');
    }

    if (password !== adminPassword) {
      setError('Invalid password. Please try again.');
      setIsLoading(false);
      throw new Error('Invalid password');
    }

    localStorage.setItem('botconfig_auth', JSON.stringify({ email: email.toLowerCase() }));
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('botconfig_auth');
    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, login, logout, isLoading, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for easy consumption of the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
