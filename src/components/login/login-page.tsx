import React, { useState, useEffect } from 'react';
import { Shield, Mail, Lock, AlertCircle, User as UserIcon, CaseSensitive, Eye, EyeOff } from 'lucide-react';
import './login-page.scss';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login, signup, isLoading, error, clearError, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    clearError();
  }, [isLoginView, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLoginView) {
        await login(email, password);
      } else {
        await signup(username, firstName, lastName, email, password);
      }
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setEmail('');
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="form-header">
            <div className="header-icon-wrapper">
              <Shield className="header-icon" />
            </div>
            <h1>BotConfig Admin</h1>
            <p>{isLoginView ? 'Sign in to your account' : 'Create a new account'}</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            {!isLoginView && (
              <>
                <div className="input-group">
                  <label htmlFor="username">Username*</label>
                  <div className="input-field-wrapper">
                    <UserIcon className="input-icon" />
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="text-input"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label htmlFor="first-name">First Name (optional)</label>
                    <div className="input-field-wrapper">
                      <CaseSensitive className="input-icon" />
                      <input
                        id="first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="text-input"
                        placeholder="Your first name"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="last-name">Last Name (optional)</label>
                    <div className="input-field-wrapper">
                      <CaseSensitive className="input-icon" />
                      <input
                        id="last-name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="text-input"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="input-group">
              <label htmlFor="email">Email Address*</label>
              <div className="input-field-wrapper">
                <Mail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password*</label>
              <div className="input-field-wrapper">
                <Lock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-input"
                  placeholder="Enter your password"
                  required
                />
                <button type="button" onClick={togglePasswordVisibility} className="password-toggle-button">
                  {showPassword ? <EyeOff className="password-toggle-icon" /> : <Eye className="password-toggle-icon" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                <p className="error-text">{error}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
            </button>
          </form>
          <div className="form-footer">
            <p>
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <span onClick={toggleView} className="toggle-button" style={{ cursor: 'pointer', color: '#1976d2' }}>
                {isLoginView ? 'Sign Up' : 'Sign In'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;