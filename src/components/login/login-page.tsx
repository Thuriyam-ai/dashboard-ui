import React, { useState } from 'react';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import './login-page.scss'; // You can reuse the styles
import { useAuth } from '@/contexts/auth-context';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth(); // Use the context

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error(err); // The error is already handled in the context, but you can log it
    }
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
            <p>Secure access required</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-field-wrapper">
                <Mail className="input-icon" />
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-input" placeholder="Enter your email" required />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-field-wrapper">
                <Lock className="input-icon" />
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-input" placeholder="Enter your password" required />
              </div>
            </div>
            {error && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                <p className="error-text">{error}</p>
              </div>
            )}
            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          <div className="form-footer">
            <p>Access is restricted to authorized personnel only.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;