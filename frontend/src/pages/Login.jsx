import React, { useState } from 'react';
import '../assets/css/LoginNew.css';

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
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.role);
        onLogin(data.token, data.role);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      // Backend not running - use demo mode
      console.log('Backend not available, using demo mode');
      
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
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <div className="brand-icon">
            <i className="fas fa-robot"></i>
          </div>
          <h1>AutoAuth Agent</h1>
          <p className="brand-tagline">Intelligent Prior Authorization Platform</p>
          
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="feature-text">
                <h3>96% Faster</h3>
                <p>Process PA in 15 minutes vs 3-7 days</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <div className="feature-text">
                <h3>AI-Powered</h3>
                <p>5 specialized agents working together</p>
              </div>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="feature-text">
                <h3>95% Approval</h3>
                <p>Higher success rate with AI analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <div className="login-header-new">
            <h2>Welcome Back</h2>
            <p>Sign in to access the platform</p>
          </div>

          <form onSubmit={handleLogin} className="login-form-new">
            <div className="input-group">
              <label>Username</label>
              <div className="input-wrapper">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-alert">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <button type="submit" className="btn-login-new" disabled={loading}>
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="divider">
            <span>Or use demo accounts</span>
          </div>

          <div className="demo-grid">
            <button 
              className="demo-card admin"
              onClick={() => quickLogin('admin')}
              type="button"
            >
              <div className="demo-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="demo-info">
                <h4>Administrator</h4>
                <p>Full system access</p>
              </div>
            </button>

            <button 
              className="demo-card coordinator"
              onClick={() => quickLogin('user')}
              type="button"
            >
              <div className="demo-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <div className="demo-info">
                <h4>PA Coordinator</h4>
                <p>Process PA requests</p>
              </div>
            </button>
          </div>

          <div className="login-footer-new">
            <p>Virtusa Jatayu Season 5 Hackathon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;