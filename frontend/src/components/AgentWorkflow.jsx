import React, { useState, useEffect } from 'react';

const AgentWorkflow = ({ activeDemo }) => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentLogs, setAgentLogs] = useState([]);

  const agents = [
    {
      id: 1,
      name: 'Intake Agent',
      icon: 'fa-inbox',
      color: '#3B82F6',
      task: 'Detecting PA request and routing',
      duration: 2000
    },
    {
      id: 2,
      name: 'Clinical Analyst Agent',
      icon: 'fa-stethoscope',
      color: '#10B981',
      task: 'Extracting clinical evidence via NLP',
      duration: 3000
    },
    {
      id: 3,
      name: 'Policy Agent',
      icon: 'fa-book-medical',
      color: '#8B5CF6',
      task: 'Retrieving payer guidelines (RAG)',
      duration: 2500
    },
    {
      id: 4,
      name: 'Submission Agent',
      icon: 'fa-paper-plane',
      color: '#F59E0B',
      task: 'Generating FHIR payload',
      duration: 2000
    },
    {
      id: 5,
      name: 'Decision Engine',
      icon: 'fa-check-circle',
      color: '#14B8A6',
      task: 'Authorization approved',
      duration: 1500
    }
  ];

  useEffect(() => {
    if (activeDemo && currentStep === -1) {
      startProcessing();
    }
  }, [activeDemo, currentStep]);

  const startProcessing = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    
    for (let i = 0; i < agents.length; i++) {
      setCurrentStep(i);
      
      // Call backend API for each agent
      try {
        const response = await fetch(`/api/agents/${agents[i].name.toLowerCase().replace(' ', '-')}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paRequestId: activeDemo })
        });
        
        const result = await response.json();
        setAgentLogs(prev => [...prev, result]);
      } catch (error) {
        // Demo mode - simulate backend
        await new Promise(resolve => setTimeout(resolve, agents[i].duration));
      }
    }
    
    // Mark as completed
    setCurrentStep(agents.length);
    setIsProcessing(false);
  };

  const resetWorkflow = () => {
    setCurrentStep(-1);
    setAgentLogs([]);
    setIsProcessing(false);
  };

  return (
    <div className="agent-workflow">
      <div className="workflow-header">
        <h2>Multi-Agent Workflow</h2>
        <button onClick={resetWorkflow} disabled={isProcessing}>
          Reset
        </button>
      </div>

      <div className="agent-pipeline">
        {agents.map((agent, index) => (
          <div 
            key={agent.id}
            className={`agent-node ${
              index === currentStep ? 'active' :
              index < currentStep ? 'completed' : 'pending'
            }`}
            style={{ 
              borderColor: index <= currentStep ? agent.color : '#E5E7EB',
              backgroundColor: index === currentStep ? `${agent.color}15` : 'white'
            }}
          >
            <div className="agent-icon" style={{ color: agent.color }}>
              <i className={`fas ${agent.icon}`}></i>
            </div>
            
            <div className="agent-info">
              <h4>{agent.name}</h4>
              <p>{agent.task}</p>
              
              {index === currentStep && (
                <div className="agent-status">
                  <i className="fas fa-spinner fa-spin"></i>
                  Processing...
                </div>
              )}
              
              {index < currentStep && (
                <div className="agent-status completed">
                  <i className="fas fa-check"></i>
                  Complete
                </div>
              )}
            </div>

            {index < agents.length - 1 && (
              <div className={`connector ${index < currentStep ? 'active' : ''}`}></div>
            )}
          </div>
        ))}
      </div>

      {agentLogs.length > 0 && (
        <div className="agent-logs">
          <h3>Agent Logs</h3>
          {agentLogs.map((log, index) => (
            <div key={index} className="log-entry">
              <span className="timestamp">{log.timestamp}</span>
              <span className="message">{log.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentWorkflow;