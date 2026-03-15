import React, { useState, useEffect } from 'react';
import AgentWorkflow from '../components/AgentWorkflow';

const UserDashboard = ({ authToken, userRole }) => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [currentPatient, setCurrentPatient] = useState({
    name: 'Vinay Varma',
    age: 58,
    patientId: 'PT-78392',
    procedure: 'Total Knee Arthroplasty',
    status: 'Ready for Review'
  });

  const startProcessing = () => {
    setActiveDemo('PA-2024-001');
  };

  const resetDemo = () => {
    setActiveDemo(null);
  };

  return (
    <div className="user-dashboard-container">
      {/* User Welcome Section */}
      <div className="user-welcome-section">
        <div className="welcome-content">
          <h1>
            <i className="fas fa-clipboard-check"></i>
            PA Coordinator Dashboard
          </h1>
          <p>Review and process prior authorization requests</p>
        </div>
        <div className="user-stats-mini">
          <div className="mini-stat">
            <div className="mini-number">12</div>
            <div className="mini-label">Assigned to You</div>
          </div>
          <div className="mini-stat">
            <div className="mini-number">8</div>
            <div className="mini-label">Completed Today</div>
          </div>
        </div>
      </div>

      {/* Simple Task Card */}
      <div className="user-task-card">
        <div className="task-header">
          <div className="task-priority">
            <span className="priority-badge high">
              <i className="fas fa-exclamation-circle"></i>
              High Priority
            </span>
            <span className="task-id">PA-2024-001</span>
          </div>
          <button 
            className={`btn-process ${activeDemo ? 'processing' : ''}`}
            onClick={startProcessing}
            disabled={activeDemo !== null}
          >
            {activeDemo ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-play-circle"></i>
                Start Processing
              </>
            )}
          </button>
        </div>

        <div className="task-patient-info">
          <div className="patient-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="patient-details-simple">
            <h2>{currentPatient.name}</h2>
            <div className="patient-meta">
              <span><i className="fas fa-birthday-cake"></i> {currentPatient.age} years</span>
              <span><i className="fas fa-id-badge"></i> {currentPatient.patientId}</span>
            </div>
          </div>
        </div>

        <div className="task-procedure-info">
          <div className="info-row">
            <div className="info-label">
              <i className="fas fa-procedures"></i>
              Requested Procedure
            </div>
            <div className="info-value">{currentPatient.procedure}</div>
          </div>
          <div className="info-row">
            <div className="info-label">
              <i className="fas fa-clipboard-check"></i>
              Status
            </div>
            <div className="info-value">
              <span className="status-indicator ready"></span>
              {currentPatient.status}
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">
              <i className="fas fa-file-alt"></i>
              Documents
            </div>
            <div className="info-value">
              <span className="doc-badge complete">
                <i className="fas fa-check"></i> 5/5 Complete
              </span>
            </div>
          </div>
        </div>

        {activeDemo && (
          <div className="task-actions">
            <button className="btn-reset-user" onClick={resetDemo}>
              <i className="fas fa-redo"></i>
              Reset & Review Again
            </button>
          </div>
        )}
      </div>

      {/* Agent Workflow - User Simplified View */}
      <div className="user-workflow-section">
        <div className="workflow-title">
          <h3>
            <i className="fas fa-robot"></i>
            AI Processing Status
          </h3>
          {activeDemo && (
            <span className="live-indicator">
              <span className="live-dot"></span>
              Live Processing
            </span>
          )}
        </div>
        <AgentWorkflow activeDemo={activeDemo} />
      </div>

      {/* Quick Tips - User Only */}
      <div className="user-tips-section">
        <h4>
          <i className="fas fa-lightbulb"></i>
          Quick Tips
        </h4>
        <div className="tips-grid">
          <div className="tip-card">
            <i className="fas fa-file-upload"></i>
            <p>Ensure all required documents are uploaded before processing</p>
          </div>
          <div className="tip-card">
            <i className="fas fa-clock"></i>
            <p>Average processing time: 15 minutes per request</p>
          </div>
          <div className="tip-card">
            <i className="fas fa-check-double"></i>
            <p>Review AI recommendations before final approval</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;