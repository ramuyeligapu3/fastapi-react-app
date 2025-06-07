import React, { useState } from 'react';
import Navbar from './Navbar';
import '../styles/LoginSignUp.css';

const LoginSignUp = () => {
  const [actionType, setActionType] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailOrUsername: '',
  });

  const handleOnClick = (action) => {
    setActionType(action);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      emailOrUsername: '',
    });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      alert(data.result);

      if (data.responseStatus === 1) {
        setActionType('Login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong!');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      alert(data.result);

      if (data.responseStatus === 1) {
        console.log('Login successful');
        // Redirect to dashboard or homepage here if needed
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">
          {actionType === 'Login'
            ? 'Welcome to PaisaTracker'
            : actionType === 'Register'
            ? 'Create an Account'
            : 'Forgot Password'}
        </h2>

        {actionType === 'Login' && (
          <>
            <div>
              <label className="input-label">Email*</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="input-label">Password*</label>
              <input
                className="input-field"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <p className="forgot-link">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOnClick('ForgotPassword');
                  }}
                >
                  Forgot password?
                </a>
              </p>
            </div>
            <button className="button-primary" onClick={handleLogin}>
              Log in
            </button>
            <p className="text-center">Don't have an account?</p>
            <button
              className="button-secondary"
              onClick={() => handleOnClick('Register')}
            >
              Register for an account
            </button>
          </>
        )}

        {actionType === 'Register' && (
          <>
            <div>
              <label className="input-label">Username*</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label className="input-label">Email*</label>
              <input
                className="input-field"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="input-label">Password*</label>
              <input
                className="input-field"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label className="input-label">Confirm Password*</label>
              <input
                className="input-field"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <button className="button-primary" onClick={handleRegister}>
              Register
            </button>
            <p className="text-center">Already have an account?</p>
            <button
              className="button-secondary"
              onClick={() => handleOnClick('Login')}
            >
              Sign in
            </button>
          </>
        )}

        {actionType === 'ForgotPassword' && (
          <>
            <div>
              <label className="input-label">Email or Username*</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter your email or username"
                value={formData.emailOrUsername}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailOrUsername: e.target.value,
                  })
                }
              />
            </div>
            <button className="button-primary">Send Reset Link</button>
            <p className="text-center">Remembered your password?</p>
            <button
              className="button-secondary"
              onClick={() => handleOnClick('Login')}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default LoginSignUp;
