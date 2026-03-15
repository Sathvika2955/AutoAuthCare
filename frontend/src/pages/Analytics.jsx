import React from 'react';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <h1 className="page-title">
        <i className="fas fa-chart-bar"></i>
        Analytics Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <i className="fas fa-file-medical"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">1,250</div>
            <div className="stat-label">Total PA Requests</div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 12% from last month
            </div>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">95.4%</div>
            <div className="stat-label">Approval Rate</div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> 5% improvement
            </div>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">14.5 min</div>
            <div className="stat-label">Avg Processing Time</div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-down"></i> 96% faster
            </div>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">$15,000</div>
            <div className="stat-label">Total Savings</div>
            <div className="stat-trend positive">
              <i className="fas fa-arrow-up"></i> Growing
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>
            <i className="fas fa-chart-line"></i>
            Processing Volume Trend
          </h3>
          <div className="chart-placeholder">
            <div className="bar-chart">
              <div className="bar" style={{height: '60%'}}><span>Jan</span></div>
              <div className="bar" style={{height: '75%'}}><span>Feb</span></div>
              <div className="bar" style={{height: '85%'}}><span>Mar</span></div>
              <div className="bar" style={{height: '70%'}}><span>Apr</span></div>
              <div className="bar" style={{height: '90%'}}><span>May</span></div>
              <div className="bar" style={{height: '95%'}}><span>Jun</span></div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>
            <i className="fas fa-pie-chart"></i>
            PA Status Distribution
          </h3>
          <div className="pie-chart">
            <div className="pie-item approved">
              <div className="pie-value">95%</div>
              <div className="pie-label">Approved</div>
            </div>
            <div className="pie-item denied">
              <div className="pie-value">3%</div>
              <div className="pie-label">Denied</div>
            </div>
            <div className="pie-item pending">
              <div className="pie-value">2%</div>
              <div className="pie-label">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="performance-section">
        <h2>
          <i className="fas fa-tachometer-alt"></i>
          Agent Performance
        </h2>
        <div className="agent-metrics">
          <div className="metric-row">
            <span className="metric-name">Intake Agent</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '98%', background: '#3B82F6'}}></div>
            </div>
            <span className="metric-value">98%</span>
          </div>
          <div className="metric-row">
            <span className="metric-name">Clinical Analyst</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '99%', background: '#10B981'}}></div>
            </div>
            <span className="metric-value">99%</span>
          </div>
          <div className="metric-row">
            <span className="metric-name">Policy Agent</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '97%', background: '#8B5CF6'}}></div>
            </div>
            <span className="metric-value">97%</span>
          </div>
          <div className="metric-row">
            <span className="metric-name">Submission Agent</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '96%', background: '#F59E0B'}}></div>
            </div>
            <span className="metric-value">96%</span>
          </div>
          <div className="metric-row">
            <span className="metric-name">Appeal Agent</span>
            <div className="metric-bar">
              <div className="metric-fill" style={{width: '94%', background: '#14B8A6'}}></div>
            </div>
            <span className="metric-value">94%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;