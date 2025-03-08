import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import './css/Login.css'; // Import your provided CSS

function Login() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/backhouse/adminUser/login',
        credentials
      );

      if (response.status === 200 && response.data.message === 'Login successful') {
        login();
        sessionStorage.setItem('adminDetails', JSON.stringify(response.data.admin));
        navigate('/'); // Redirect to the dashboard
      } else {
        setError('Invalid login credentials. Please try again.');
      }
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 404:
            setError('Invalid username or password.');
            break;
          case 403:
            setError('Your account is locked. Please contact the administrator.');
            break;
          default:
            setError('An error occurred. Please try again later.');
        }
      } else {
        setError('Unable to connect. Please check your network connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <header>
        <h1>Admin Login</h1>
      </header>
      <form onSubmit={handleLogin} className="login-form">
        {error && <p style={{ color: '#e74c3c', textAlign: 'center' }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
