import React, { useState, useEffect } from 'react';
import AgentWorkflow from '../components/AgentWorkflow';
import PatientCard from '../components/PatientCard';
import MetricsPanel from '../components/MetricsPanel';

const Dashboard = () => {
  const [paRequests, setPaRequests] = useState([]);
  const [activeDemo, setActiveDemo] = useState(null);

  useEffect(() => {
    // Fetch PA requests from backend
    fetchPARequests();
  }, []);

  const fetchPARequests = async () => {
    try {
      const response = await fetch('/api/pa-requests');
      const data = await response.json();
      setPaRequests(data);
    } catch (error) {
      console.log('Using demo data');
      // Use demo data if backend not available
      setPaRequests([
        {
          id: 'PA-2024-001',
          patientName: 'Vinay Varma',
          procedure: 'Total Knee Arthroplasty',
          status: 'pending',
          priority: 'high'
        }
      ]);
    }
  };

  const startDemo = (requestId) => {
    setActiveDemo(requestId);
  };

  const resetDemo = () => {
    setActiveDemo(null);
  };

  return (
    <div className="dashboard-container">
      {/* Quick Action Bar */}
      <div className="quick-action-bar">
        <div className="action-bar-header">
          <h2>
            <i className="fas fa-bolt"></i>
            Quick Actions
          </h2>
        </div>
        <button 
          className="btn-start-demo"
          onClick={() => startDemo('PA-2024-001')}
          disabled={activeDemo !== null}
        >
          <i className="fas fa-play-circle"></i>
          Start PA Processing
        </button>
        <div className="demo-status">
          {activeDemo ? (
            <span className="status-active">
              <i className="fas fa-spinner fa-spin"></i>
              Processing PA Request...
            </span>
          ) : (
            <span className="status-ready">
              <i className="fas fa-check-circle"></i>
              Ready to Process
            </span>
          )}
        </div>
        {activeDemo && (
          <button 
            className="btn-reset"
            onClick={resetDemo}
          >
            <i className="fas fa-redo"></i>
            Reset Demo
          </button>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="left-panel">
          <PatientCard />
          <MetricsPanel />
        </div>
        
        <div className="center-panel">
          <AgentWorkflow activeDemo={activeDemo} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;