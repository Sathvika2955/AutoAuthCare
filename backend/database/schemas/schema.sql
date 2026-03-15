
-- AutoAuth Agent Platform Database Schema
-- PostgreSQL

CREATE TABLE IF NOT EXISTS pa_requests (
    id VARCHAR(50) PRIMARY KEY,
    patient_id VARCHAR(50) NOT NULL,
    procedure_code VARCHAR(20) NOT NULL,
    procedure_name VARCHAR(200) NOT NULL,
    diagnosis_code VARCHAR(20) NOT NULL,
    payer_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,
    authorization_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    insurance_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS authorizations (
    id VARCHAR(50) PRIMARY KEY,
    pa_request_id VARCHAR(50) REFERENCES pa_requests(id),
    authorization_number VARCHAR(100),
    status VARCHAR(20),
    approved_date TIMESTAMP,
    expiration_date TIMESTAMP,
    payer_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agent_logs (
    id SERIAL PRIMARY KEY,
    pa_request_id VARCHAR(50) REFERENCES pa_requests(id),
    agent_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL,
    message TEXT,
    execution_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pa_requests_status ON pa_requests(status);
CREATE INDEX idx_pa_requests_patient ON pa_requests(patient_id);
CREATE INDEX idx_agent_logs_request ON agent_logs(pa_request_id);