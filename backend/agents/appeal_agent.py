"""
Appeal Agent - Generates appeal letters for denied PA requests
"""
import json
from datetime import datetime

class AppealAgent:
    def __init__(self):
        self.name = "Appeal Agent"
        self.version = "1.0.0"
    
    def generate_appeal(self, pa_request_id, denial_reason):
        """
        Generate appeal letter with supporting evidence
        
        Args:
            pa_request_id: PA request identifier
            denial_reason: Reason for denial
            
        Returns:
            dict: Appeal letter and supporting documents
        """
        print(f"[{self.name}] Generating appeal for {pa_request_id}")
        
        # Analyze denial reason
        denial_analysis = self._analyze_denial(denial_reason)
        
        # Find missing evidence
        missing_evidence = self._identify_missing_evidence(denial_analysis)
        
        # Generate appeal letter
        appeal_letter = self._compose_appeal_letter(
            pa_request_id,
            denial_reason,
            missing_evidence
        )
        
        result = {
            'requestId': pa_request_id,
            'appealId': f"APPEAL-{pa_request_id}",
            'denialReason': denial_reason,
            'appealLetter': appeal_letter,
            'supportingDocuments': missing_evidence['documents'],
            'timestamp': datetime.now().isoformat(),
            'status': 'appeal_ready'
        }
        
        print(f"[{self.name}] Appeal letter generated")
        
        return result
    
    def _analyze_denial(self, denial_reason):
        """Analyze why PA was denied"""
        return {
            'category': 'insufficient_evidence',
            'specificIssue': 'Missing imaging documentation',
            'appealable': True
        }
    
    def _identify_missing_evidence(self, denial_analysis):
        """Find evidence to support appeal"""
        return {
            'documents': [
                'X-ray report dated 2024-01-15',
                'Physical therapy progress notes (8 months)',
                'Pain assessment logs'
            ],
            'newFindings': []
        }
    
    def _compose_appeal_letter(self, pa_request_id, denial_reason, missing_evidence):
        """Compose formal appeal letter"""
        return f"""
APPEAL LETTER

PA Request ID: {pa_request_id}
Date: {datetime.now().strftime('%Y-%m-%d')}

Dear Prior Authorization Review Committee,

We are writing to appeal the denial of prior authorization for Total Knee Arthroplasty 
for our patient (PA Request: {pa_request_id}).

DENIAL REASON: {denial_reason}

SUPPORTING EVIDENCE:
We are providing the following additional documentation to support this appeal:

{chr(10).join('- ' + doc for doc in missing_evidence['documents'])}

CLINICAL JUSTIFICATION:
The patient has severe osteoarthritis with documented radiographic evidence of bone-on-bone 
contact. Conservative treatment including 8 months of physical therapy, 12 months of NSAIDs, 
and multiple cortisone injections have all failed to provide adequate relief.

The patient's functional status is significantly impaired, with inability to walk more than 
100 feet without severe pain (8/10 severity). This directly impacts their activities of daily 
living and quality of life.

We respectfully request reconsideration of this prior authorization based on the comprehensive 
clinical evidence demonstrating medical necessity.

Thank you for your consideration.

Sincerely,
AutoAuth Agent Platform
On behalf of treating physician
"""