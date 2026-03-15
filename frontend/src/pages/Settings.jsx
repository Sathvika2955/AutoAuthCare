import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    autoApprove: true,
    emailNotifications: true,
    slackAlerts: false,
    debugMode: false
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="settings-container">
      <h1 className="page-title">
        <i className="fas fa-cog"></i>
        System Settings
      </h1>

      {/* General Settings */}
      <div className="settings-section">
        <h2>
          <i className="fas fa-sliders-h"></i>
          General Configuration
        </h2>
        
        <div className="settings-grid">
          <div className="setting-item">
            <div className="setting-info">
              <h3>Auto-Approve Low Risk Cases</h3>
              <p>Automatically approve PA requests that meet all criteria with high confidence</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.autoApprove}
                onChange={() => handleToggle('autoApprove')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Email Notifications</h3>
              <p>Receive email alerts for completed PA requests and system updates</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Slack Integration</h3>
              <p>Send real-time notifications to your Slack workspace</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.slackAlerts}
                onChange={() => handleToggle('slackAlerts')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Debug Mode</h3>
              <p>Enable detailed logging and debugging information for troubleshooting</p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.debugMode}
                onChange={() => handleToggle('debugMode')}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="settings-section">
        <h2>
          <i className="fas fa-plug"></i>
          API Configuration
        </h2>
        
        <div className="api-config">
          <div className="config-item">
            <label>FHIR API Endpoint</label>
            <input type="text" value="https://fhir.example.com/R4" readOnly />
            <button className="btn-secondary">
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>

          <div className="config-item">
            <label>Payer API Integration</label>
            <select>
              <option>Humana Medicare Advantage</option>
              <option>Aetna</option>
              <option>Cigna</option>
              <option>UnitedHealthcare</option>
            </select>
            <button className="btn-secondary">
              <i className="fas fa-plus"></i> Add New
            </button>
          </div>

          <div className="config-item">
            <label>RAG Vector Database</label>
            <input type="text" value="Pinecone - us-west1-gcp" readOnly />
            <button className="btn-success">
              <i className="fas fa-check-circle"></i> Connected
            </button>
          </div>
        </div>
      </div>

      {/* Agent Settings */}
      <div className="settings-section">
        <h2>
          <i className="fas fa-robot"></i>
          Agent Configuration
        </h2>
        
        <div className="agent-settings">
          <div className="agent-config-card">
            <h4>
              <i className="fas fa-inbox"></i> Intake Agent
            </h4>
            <div className="config-row">
              <span>Timeout:</span>
              <input type="number" defaultValue="30" /> seconds
            </div>
            <div className="config-row">
              <span>Max Retries:</span>
              <input type="number" defaultValue="3" />
            </div>
          </div>

          <div className="agent-config-card">
            <h4>
              <i className="fas fa-stethoscope"></i> Clinical Analyst
            </h4>
            <div className="config-row">
              <span>NLP Model:</span>
              <select>
                <option>Bio-BERT</option>
                <option>ClinicalBERT</option>
              </select>
            </div>
            <div className="config-row">
              <span>Confidence Threshold:</span>
              <input type="number" defaultValue="0.85" step="0.05" min="0" max="1" />
            </div>
          </div>

          <div className="agent-config-card">
            <h4>
              <i className="fas fa-book-medical"></i> Policy Agent
            </h4>
            <div className="config-row">
              <span>RAG Top-K:</span>
              <input type="number" defaultValue="5" />
            </div>
            <div className="config-row">
              <span>Update Frequency:</span>
              <select>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="settings-actions">
        <button className="btn-primary">
          <i className="fas fa-save"></i>
          Save All Changes
        </button>
        <button className="btn-secondary">
          <i className="fas fa-undo"></i>
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default Settings;