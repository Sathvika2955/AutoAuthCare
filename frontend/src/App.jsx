import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import AgentWorkflow from './components/AgentWorkflow';
import PatientCard from './components/PatientCard';
import MetricsPanel from './components/MetricsPanel';
import './assets/css/App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <i className="fas fa-robot"></i>
          <h1>AutoAuth Agent Platform</h1>
        </div>
        <nav className="main-nav">
          <button onClick={() => setCurrentView('dashboard')} 
                  className={currentView === 'dashboard' ? 'active' : ''}>
            Dashboard
          </button>
          <button onClick={() => setCurrentView('analytics')}
                  className={currentView === 'analytics' ? 'active' : ''}>
            Analytics
          </button>
          <button onClick={() => setCurrentView('settings')}
                  className={currentView === 'settings' ? 'active' : ''}>
            Settings
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentView === 'dashboard' && <Dashboard />}
      </main>

      <footer className="app-footer">
        <p>AutoAuth Agent Platform v1.0 | Virtusa Jatayu Season 5</p>
      </footer>
    </div>
  );
}

export default App;