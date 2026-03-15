import React, { useState, useEffect } from 'react';
import AgentWorkflow from '../components/AgentWorkflow';
import PatientCard from '../components/PatientCard';
import MetricsPanel from '../components/MetricsPanel';

const AdminDashboard = ({ authToken, userRole }) => {
  const [paRequests, setPaRequests] = useState([]);
  const [activeDemo, setActiveDemo] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchPARequests();
  }, []);

  const fetchPARequests = async () => {
    try {
      const response = await fetch('/api/pa-requests');
      const data = await response.json();
      setPaRequests(data);
    } catch (error) {
      console.log('Using demo data');
      setPaRequests([
        {
          id: 'PA-2024-001',
          patientName: 'Vinay Varma',
          procedure: 'Total Knee Arthroplasty',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'PA-2024-002',
          patientName: 'Sanjay',
          procedure: 'Cardiac Catheterization',
          status: 'processing',
          priority: 'urgent'
        },
        {
          id: 'PA-2024-003',
          patientName: 'Sreeja Sharma',
          procedure: 'MRI Brain',
          status: 'approved',
          priority: 'medium'
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
    <div className="admin-dashboard-container">
      {/* Admin Control Panel */}
      <div className="admin-control-panel">
        <div className="control-header">
          <div>
            <h2>
              <i className="fas fa-user-shield"></i>
              Admin Control Center
            </h2>
            <p>Full system access and management</p>
          </div>
          <div className="admin-actions">
            <button className="btn-create-pa" onClick={() => setShowCreateModal(true)}>
              <i className="fas fa-plus-circle"></i>
              Create New PA Request
            </button>
            <button className="btn-export">
              <i className="fas fa-download"></i>
              Export Reports
            </button>
            <button className="btn-manage">
              <i className="fas fa-users-cog"></i>
              Manage Users
            </button>
          </div>
        </div>

        {/* System Stats - Admin Only */}
        <div className="system-stats-grid">
          <div className="system-stat">
            <div className="stat-icon-admin purple">
              <i className="fas fa-server"></i>
            </div>
            <div className="stat-data">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">System Uptime</div>
            </div>
          </div>
          <div className="system-stat">
            <div className="stat-icon-admin blue">
              <i className="fas fa-database"></i>
            </div>
            <div className="stat-data">
              <div className="stat-number">2,847</div>
              <div className="stat-label">Total PA Processed</div>
            </div>
          </div>
          <div className="system-stat">
            <div className="stat-icon-admin green">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-data">
              <div className="stat-number">24</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
          <div className="system-stat">
            <div className="stat-icon-admin orange">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="stat-data">
              <div className="stat-number">3</div>
              <div className="stat-label">Pending Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="quick-action-bar admin-theme">
        <div className="action-bar-header">
          <h2>
            <i className="fas fa-bolt"></i>
            Process PA Requests
          </h2>
        </div>
        <button 
          className="btn-start-demo"
          onClick={() => startDemo('PA-2024-001')}
          disabled={activeDemo !== null}
        >
          <i className="fas fa-play-circle"></i>
          Start Auto Processing
        </button>
        <div className="demo-status">
          {activeDemo ? (
            <span className="status-active">
              <i className="fas fa-spinner fa-spin"></i>
              Processing...
            </span>
          ) : (
            <span className="status-ready">
              <i className="fas fa-check-circle"></i>
              Ready
            </span>
          )}
        </div>
        {activeDemo && (
          <button className="btn-reset" onClick={resetDemo}>
            <i className="fas fa-redo"></i>
            Reset
          </button>
        )}
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        <div className="left-panel">
          <PatientCard />
          <MetricsPanel />
          
          {/* Admin-only Queue Manager */}
          <div className="queue-manager">
            <h3>
              <i className="fas fa-list-alt"></i>
              PA Request Queue
            </h3>
            <div className="queue-list">
              {paRequests.map(request => (
                <div key={request.id} className={`queue-item priority-${request.priority}`}>
                  <div className="queue-info">
                    <h4>{request.patientName}</h4>
                    <p>{request.procedure}</p>
                    <span className={`status-tag ${request.status}`}>
                      {request.status}
                    </span>
                  </div>
                  <button 
                    className="btn-queue-action"
                    onClick={() => startDemo(request.id)}
                  >
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="center-panel">
          <AgentWorkflow activeDemo={activeDemo} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;