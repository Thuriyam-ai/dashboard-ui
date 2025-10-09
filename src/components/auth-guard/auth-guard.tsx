import React, { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@mui/material';
import { useAuth } from '@/contexts/auth-context';
import LoginPage from '@/components/login/login-page';
import './auth-guard.scss';
import { Logout } from '@mui/icons-material';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  if (isLoading) {
    return <LoadingScreen />;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;