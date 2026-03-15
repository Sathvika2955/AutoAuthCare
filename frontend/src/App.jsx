import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './assets/css/App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (token && role) {
      setAuthToken(token);
      setUserRole(role);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (token, role) => {
    setAuthToken(token);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setAuthToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <i className="fas fa-robot"></i>
          <h1>AutoAuth Agent Platform</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <nav className="main-nav">
            <button onClick={() => setCurrentView('dashboard')} 
                    className={currentView === 'dashboard' ? 'active' : ''}>
              <i className="fas fa-home"></i> Dashboard
            </button>
            <button onClick={() => setCurrentView('analytics')}
                    className={currentView === 'analytics' ? 'active' : ''}>
              <i className="fas fa-chart-bar"></i> Analytics
            </button>
            {userRole === 'admin' && (
              <button onClick={() => setCurrentView('settings')}
                      className={currentView === 'settings' ? 'active' : ''}>
                <i className="fas fa-cog"></i> Settings
              </button>
            )}
          </nav>
          <div className="user-info">
            <div className="user-badge">
              <i className={userRole === 'admin' ? 'fas fa-user-shield' : 'fas fa-user'}></i>
              <span>{userRole === 'admin' ? 'Admin' : 'User'}</span>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && <Dashboard authToken={authToken} userRole={userRole} />}
        {currentView === 'analytics' && <Analytics authToken={authToken} userRole={userRole} />}
        {currentView === 'settings' && userRole === 'admin' && <Settings authToken={authToken} />}
      </main>

      <footer className="app-footer">
        <p>AutoAuth Agent Platform v1.0 | Virtusa Jatayu Season 5</p>
      </footer>
    </div>
  );
}

export default App;