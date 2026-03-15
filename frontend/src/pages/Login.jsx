import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try to connect to backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        // Store token and role in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.role);
        
        // Call parent callback
        onLogin(data.token, data.role);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      // Backend not running - use demo mode
      console.log('Backend not available, using demo mode');
      
      // Validate credentials locally
      if (username === 'admin' && password === 'admin123') {
        const token = 'ADMIN_SECRET_2024_AUTOAUTH';
        const role = 'admin';
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        onLogin(token, role);
      } else if (username === 'user' && password === 'user123') {
        const token = 'USER_SECRET_2024_AUTOAUTH';
        const role = 'user';
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
        onLogin(token, role);
      } else {
        setError('Invalid credentials. Try admin/admin123 or user/user123');
      }
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role) => {
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <div className="login-icon">
            <i className="fas fa-robot"></i>
          </div>
          <h1>AutoAuth Agent Platform</h1>
          <p>Multi-Agent AI for Prior Authorization</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>
              <i className="fas fa-user"></i>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-title">
            <i className="fas fa-info-circle"></i>
            Demo Credentials
          </p>
          <div className="demo-buttons">
            <button 
              className="demo-btn admin"
              onClick={() => quickLogin('admin')}
              type="button"
            >
              <i className="fas fa-user-shield"></i>
              Admin Demo
              <span>admin / admin123</span>
            </button>
            <button 
              className="demo-btn user"
              onClick={() => quickLogin('user')}
              type="button"
            >
              <i className="fas fa-user"></i>
              User Demo
              <span>user / user123</span>
            </button>
          </div>
        </div>

        <div className="login-footer">
          <p>Virtusa Jatayu Season 5 | AutoAuth Agent Team</p>
        </div>
      </div>
    </div>
  );
};

export default Login;