import React, { useState, useEffect } from 'react';
import './Login.css';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'create'

  // Login Form States
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Create Password Form States
  const [createId, setCreateId] = useState('');
  const [createPass, setCreatePass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Local Database simulation using localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('hcm_users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { username: 'admin', password: 'password123' } // Default admin account
    ];
  });

  useEffect(() => {
    localStorage.setItem('hcm_users', JSON.stringify(users));
  }, [users]);

  // Handle Login Action
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setFeedback(null);
    const foundUser = users.find(
      (u) => u.username === loginUser && u.password === loginPass
    );

    if (foundUser) {
      localStorage.setItem('token', 'mock_jwt_token_123456');
      localStorage.setItem('hcm_current_user', foundUser.username);
      setIsLoggingIn(true);
      setFeedback({
        type: 'success',
        title: 'Login successful',
        message: 'Welcome back. Your HCM workspace is ready.',
      });
      window.setTimeout(() => {
        window.location.assign('/dashboard');
      }, 1250);
    } else {
      setFeedback({
        type: 'error',
        title: 'Unable to sign in',
        message: 'Check your username and password, then try again.',
      });
    }
  };

  // Handle Create Password Action
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setFeedback(null);
    if (createPass !== confirmPass) {
      setFeedback({
        type: 'error',
        title: 'Passwords do not match',
        message: 'Enter the same password in both password fields.',
      });
      return;
    }

    const existingUser = users.find((u) => u.username === createId);
    if (existingUser) {
      setFeedback({
        type: 'error',
        title: 'Account already exists',
        message: 'This username is already registered. Sign in instead.',
      });
      return;
    }

    const updatedUsers = [...users, { username: createId, password: createPass }];
    setUsers(updatedUsers);
    setFeedback({
      type: 'success',
      title: 'Account created',
      message: 'Your password is ready. Sign in to open your HCM workspace.',
    });
    window.setTimeout(() => setFeedback(null), 2400);

    // Reset fields and switch to login tab
    setCreateId('');
    setCreatePass('');
    setConfirmPass('');
    setActiveTab('login');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Header & Title */}
        <div className="login-header">
          <div className="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 21V7l8-4v18m6 0V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01M14 9v.01M14 12v.01M14 15v.01M14 18v.01M17 14v.01M17 17v.01" />
            </svg>
          </div>
          <h1>HCM Lite Portal</h1>
        </div>

        {/* Tabs Switcher (jaise image mein hai) */}
        <div className="portal-tabs">
          <button 
            type="button" 
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setFeedback(null);
            }}
          >
            Login
          </button>
          <button 
            type="button" 
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('create');
              setFeedback(null);
            }}
          >
            Create Password
          </button>
        </div>

        {feedback?.type === 'error' && (
          <div
            className={`login-feedback ${feedback.type}`}
            role={feedback.type === 'error' ? 'alert' : 'status'}
            aria-live="polite"
          >
            <span className="feedback-icon" aria-hidden="true">
              {feedback.type === 'success' ? '✓' : '!'}
            </span>
            <span>
              <strong>{feedback.title}</strong>
              <span>{feedback.message}</span>
            </span>
          </div>
        )}

        {/* Conditional Rendering based on Active Tab */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Username / CNIC *</label>
              <input 
                type="text" 
                placeholder="Enter username or CNIC" 
                value={loginUser} 
                onChange={(e) => {
                  setLoginUser(e.target.value);
                  setFeedback(null);
                }} 
                required 
                disabled={isLoggingIn}
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input 
                type="password" 
                placeholder="Enter password" 
                value={loginPass} 
                onChange={(e) => {
                  setLoginPass(e.target.value);
                  setFeedback(null);
                }} 
                required 
                disabled={isLoggingIn}
              />
            </div>

            <button type="submit" className="login-btn" disabled={isLoggingIn}>
              {isLoggingIn ? 'OPENING WORKSPACE…' : 'SIGN IN'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCreateSubmit}>
            <div className="form-group">
              <label>Username / CNIC *</label>
              <input 
                type="text" 
                placeholder="Enter username or CNIC" 
                value={createId} 
                onChange={(e) => {
                  setCreateId(e.target.value);
                  setFeedback(null);
                }} 
                required 
              />
            </div>

            <div className="form-group">
              <label>New Password *</label>
              <input 
                type="password" 
                placeholder="Enter new password" 
                value={createPass} 
                onChange={(e) => {
                  setCreatePass(e.target.value);
                  setFeedback(null);
                }} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input 
                type="password" 
                placeholder="Confirm password" 
                value={confirmPass} 
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                  setFeedback(null);
                }} 
                required 
              />
            </div>

            <button type="submit" className="login-btn">
              CREATE PASSWORD
            </button>
          </form>
        )}

      </div>
      {feedback?.type === 'success' && (
        <div className="login-success-overlay" role="status" aria-live="polite">
          <div className="login-success-popup">
            <div className="success-checkmark" aria-hidden="true">
              <svg viewBox="0 0 52 52">
                <path d="M14 27l8 8 17-18" />
              </svg>
            </div>
            <span className="success-eyebrow">HCM LITE PORTAL</span>
            <h2>{feedback.title}</h2>
            <p>{feedback.message}</p>
            {isLoggingIn && <span className="success-progress" aria-hidden="true" />}
          </div>
        </div>
      )}
    </div>
  );
}