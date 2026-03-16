from flask import Flask, request, jsonify
from flask_cors import CORS
import time
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# Import agent modules
import sys
import os

# Add parent directory to path so we can import agents
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.intake_agent import IntakeAgent
from agents.clinical_analyst import ClinicalAnalystAgent
from agents.policy_agent import PolicyAgent
from agents.submission_agent import SubmissionAgent
from agents.appeal_agent import AppealAgent

# Import authentication
from utils.auth import require_auth, get_current_user_role

# Initialize agents
intake_agent = IntakeAgent()
clinical_agent = ClinicalAnalystAgent()
policy_agent = PolicyAgent()
submission_agent = SubmissionAgent()
appeal_agent = AppealAgent()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'AutoAuth Agent Platform'
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    """
    Login endpoint - validates credentials and returns token
    Body: { "username": "admin" or "user", "password": "password" }
    """
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Simple credential check (in production, use hashed passwords and database)
    if username == 'admin' and password == 'admin123':
        return jsonify({
            'success': True,
            'token': 'ADMIN_SECRET_2024_AUTOAUTH',
            'role': 'admin',
            'message': 'Admin login successful'
        })
    elif username == 'user' and password == 'user123':
        return jsonify({
            'success': True,
            'token': 'USER_SECRET_2024_AUTOAUTH',
            'role': 'user',
            'message': 'User login successful'
        })
    else:
        return jsonify({
            'success': False,
            'error': 'Invalid credentials'
        }), 401

@app.route('/api/auth/verify', methods=['GET'])
@require_auth()
def verify_token():
    """Verify token and return user info"""
    role = get_current_user_role()
    return jsonify({
        'valid': True,
        'role': role,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/pa-requests', methods=['GET'])
@require_auth()  # Requires any authenticated user
def get_pa_requests():
    """Get all pending PA requests"""
    # In production, this would query database
    return jsonify([
        {
            'id': 'PA-2024-001',
            'patientName': 'Vinay Varma',
            'patientId': 'PT-12345',
            'procedure': 'Total Knee Arthroplasty',
            'procedureCode': 'CPT-27447',
            'diagnosis': 'M17.11 - Severe Osteoarthritis',
            'payer': 'Humana Medicare Advantage',
            'status': 'pending',
            'priority': 'high',
            'submittedAt': '2024-03-08T10:30:00Z'
        }
    ])

@app.route('/api/pa-requests', methods=['POST'])
@require_auth('admin')  # Only admin can create PA requests
def create_pa_request():
    """Create new PA request - ADMIN ONLY"""
    data = request.json
    # In production, save to database
    return jsonify({
        'id': f"PA-2024-{int(time.time())}",
        'status': 'created',
        'message': 'PA request created successfully',
        'createdBy': get_current_user_role()
    }), 201

@app.route('/api/agents/intake-agent', methods=['POST'])
def run_intake_agent():
    """Process PA request through Intake Agent"""
    data = request.json
    pa_request_id = data.get('paRequestId')
    
    result = intake_agent.process(pa_request_id)
    
    return jsonify({
        'agent': 'Intake Agent',
        'status': 'completed',
        'timestamp': datetime.now().isoformat(),
        'message': f"PA request {pa_request_id} routed to Clinical Analyst",
        'data': result
    })

@app.route('/api/agents/clinical-analyst-agent', methods=['POST'])
def run_clinical_agent():
    """Extract clinical evidence"""
    data = request.json
    pa_request_id = data.get('paRequestId')
    
    result = clinical_agent.extract_evidence(pa_request_id)
    
    return jsonify({
        'agent': 'Clinical Analyst Agent',
        'status': 'completed',
        'timestamp': datetime.now().isoformat(),
        'message': f"Extracted {len(result['evidence'])} pieces of clinical evidence",
        'data': result
    })

@app.route('/api/agents/policy-agent', methods=['POST'])
def run_policy_agent():
    """Retrieve and match payer policies"""
    data = request.json
    pa_request_id = data.get('paRequestId')
    
    result = policy_agent.retrieve_policy(pa_request_id)
    
    return jsonify({
        'agent': 'Policy Agent',
        'status': 'completed',
        'timestamp': datetime.now().isoformat(),
        'message': f"Policy criteria matched: {result['matched']}/{result['total']}",
        'data': result
    })

@app.route('/api/agents/submission-agent', methods=['POST'])
def run_submission_agent():
    """Generate and submit FHIR payload"""
    data = request.json
    pa_request_id = data.get('paRequestId')
    
    result = submission_agent.submit(pa_request_id)
    
    return jsonify({
        'agent': 'Submission Agent',
        'status': 'completed',
        'timestamp': datetime.now().isoformat(),
        'message': f"PA submitted successfully. Auth ID: {result['authId']}",
        'data': result
    })

@app.route('/api/agents/appeal-agent', methods=['POST'])
def run_appeal_agent():
    """Generate appeal letter for denied PA"""
    data = request.json
    pa_request_id = data.get('paRequestId')
    denial_reason = data.get('denialReason', '')
    
    result = appeal_agent.generate_appeal(pa_request_id, denial_reason)
    
    return jsonify({
        'agent': 'Appeal Agent',
        'status': 'completed',
        'timestamp': datetime.now().isoformat(),
        'message': f"Appeal letter generated",
        'data': result
    })

@app.route('/api/process/complete', methods=['POST'])
@require_auth()  # Requires authentication
def process_complete_workflow():
    """Run complete PA workflow through all agents"""
    data = request.json
    pa_request_id = data.get('paRequestId')
    
    user_role = get_current_user_role()
    
    workflow_results = {
        'paRequestId': pa_request_id,
        'startTime': datetime.now().isoformat(),
        'processedBy': user_role,
        'steps': []
    }
    
    # Step 1: Intake
    intake_result = intake_agent.process(pa_request_id)
    workflow_results['steps'].append({
        'agent': 'Intake Agent',
        'status': 'completed',
        'result': intake_result
    })
    
    # Step 2: Clinical Analysis
    clinical_result = clinical_agent.extract_evidence(pa_request_id)
    workflow_results['steps'].append({
        'agent': 'Clinical Analyst Agent',
        'status': 'completed',
        'result': clinical_result
    })
    
    # Step 3: Policy Retrieval
    policy_result = policy_agent.retrieve_policy(pa_request_id)
    workflow_results['steps'].append({
        'agent': 'Policy Agent',
        'status': 'completed',
        'result': policy_result
    })
    
    # Step 4: Submission
    submission_result = submission_agent.submit(pa_request_id)
    workflow_results['steps'].append({
        'agent': 'Submission Agent',
        'status': 'completed',
        'result': submission_result
    })
    
    workflow_results['endTime'] = datetime.now().isoformat()
    workflow_results['finalStatus'] = submission_result['status']
    
    return jsonify(workflow_results)

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    """Get platform metrics"""
    return jsonify({
        'today': {
            'totalRequests': 47,
            'approved': 45,
            'denied': 2,
            'avgProcessingTime': '14.5 minutes',
            'costSavings': '$564'
        },
        'thisWeek': {
            'totalRequests': 312,
            'approvalRate': 95.8,
            'automationRate': 95.2,
            'costSavings': '$3,744'
        },
        'allTime': {
            'totalRequests': 1250,
            'totalSavings': '$15,000',
            'avgApprovalRate': 95.4
        }
    })