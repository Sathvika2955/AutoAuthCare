import React, { useState, useEffect } from 'react';

const MetricsPanel = () => {
  const [metrics, setMetrics] = useState({
    today: {
      totalRequests: 0,
      approved: 0,
      denied: 0,
      avgProcessingTime: '0 min',
      costSavings: '$0'
    },
    thisWeek: {
      totalRequests: 0,
      approvalRate: 0,
      automationRate: 0,
      costSavings: '$0'
    }
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      // Use demo data if backend not available
      setMetrics({
        today: {
          totalRequests: 47,
          approved: 45,
          denied: 2,
          avgProcessingTime: '14.5 minutes',
          costSavings: '$564'
        },
        thisWeek: {
          totalRequests: 312,
          approvalRate: 95.8,
          automationRate: 95.2,
          costSavings: '$3,744'
        }
      });
    }
  };

  return (
    <div className="metrics-panel">
      {/* Today's Metrics Card */}
      <div className="metrics-card today">
        <div className="metrics-header">
          <div className="metrics-icon blue">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Today's Metrics</h3>
        </div>

        <div className="metrics-grid">
          <div className="metric-item">
            <div className="metric-label">Total Requests</div>
            <div className="metric-value large blue">{metrics.today.totalRequests}</div>
          </div>

          <div className="metric-row">
            <div className="metric-mini success">
              <i className="fas fa-check-circle"></i>
              <div>
                <div className="mini-value">{metrics.today.approved}</div>
                <div className="mini-label">Approved</div>
              </div>
            </div>
            <div className="metric-mini danger">
              <i className="fas fa-times-circle"></i>
              <div>
                <div className="mini-value">{metrics.today.denied}</div>
                <div className="mini-label">Denied</div>
              </div>
            </div>
          </div>

          <div className="metric-divider"></div>

          <div className="metric-item">
            <div className="metric-label">
              <i className="fas fa-clock"></i>
              Avg Processing Time
            </div>
            <div className="metric-value">{metrics.today.avgProcessingTime}</div>
          </div>

          <div className="metric-item">
            <div className="metric-label">
              <i className="fas fa-dollar-sign"></i>
              Cost Savings
            </div>
            <div className="metric-value success">{metrics.today.costSavings}</div>
          </div>
        </div>
      </div>

      {/* This Week's Performance Card */}
      <div className="metrics-card performance">
        <div className="metrics-header">
          <div className="metrics-icon purple">
            <i className="fas fa-trophy"></i>
          </div>
          <h3>This Week's Performance</h3>
        </div>

        <div className="performance-stats">
          {/* Approval Rate */}
          <div className="stat-item">
            <div className="stat-header">
              <span className="stat-label">Approval Rate</span>
              <span className="stat-percentage">{metrics.thisWeek.approvalRate}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill green"
                style={{ width: `${metrics.thisWeek.approvalRate}%` }}
              ></div>
            </div>
          </div>

          {/* Automation Rate */}
          <div className="stat-item">
            <div className="stat-header">
              <span className="stat-label">Automation Rate</span>
              <span className="stat-percentage">{metrics.thisWeek.automationRate}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill blue"
                style={{ width: `${metrics.thisWeek.automationRate}%` }}
              ></div>
            </div>
          </div>

          <div className="metric-divider"></div>

          {/* Total Cost Savings */}
          <div className="savings-highlight">
            <div className="savings-icon">
              <i className="fas fa-piggy-bank"></i>
            </div>
            <div className="savings-content">
              <div className="savings-label">Total Cost Savings</div>
              <div className="savings-amount">{metrics.thisWeek.costSavings}</div>
              <div className="savings-subtitle">{metrics.thisWeek.totalRequests} requests processed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Summary */}
      <div className="metrics-card summary">
        <div className="summary-grid">
          <div className="summary-stat automation">
            <div className="summary-value">95%</div>
            <div className="summary-label">Automation</div>
            <i className="fas fa-robot summary-icon"></i>
          </div>

          <div className="summary-stat speed">
            <div className="summary-value">96%</div>
            <div className="summary-label">Faster</div>
            <i className="fas fa-bolt summary-icon"></i>
          </div>

          <div className="summary-stat cost">
            <div className="summary-value">$0.50</div>
            <div className="summary-label">Cost/PA</div>
            <i className="fas fa-coins summary-icon"></i>
          </div>

          <div className="summary-stat roi">
            <div className="summary-value">136%</div>
            <div className="summary-label">ROI Y1</div>
            <i className="fas fa-chart-pie summary-icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;