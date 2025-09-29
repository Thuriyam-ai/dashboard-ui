
import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@mui/material';
import { useAuth } from '../../contexts/auth-context';
import LoginPage from '../login/login-page';
import './auth-guard.scss';
import { Logout } from '@mui/icons-material';

interface AuthGuardProps {
  children: React.ReactNode;
}

const LoadingScreen = () => (
  <div className="loading-screen">
    <LoaderCircle className="spinner-icon" />
  </div>
);

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Use the context

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;
