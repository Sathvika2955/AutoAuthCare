"""
Submission Agent - Generates FHIR payload and submits to payer
"""
import json
from datetime import datetime
import uuid

class SubmissionAgent:
    def __init__(self):
        self.name = "Submission Agent"
        self.version = "1.0.0"
    
    def submit(self, pa_request_id):
        """
        Generate FHIR R4 compliant payload and submit to payer
        
        Args:
            pa_request_id: PA request identifier
            
        Returns:
            dict: Submission result with authorization details
        """
        print(f"[{self.name}] Generating FHIR payload for {pa_request_id}")
        
        # Generate FHIR payload
        fhir_payload = self._generate_fhir_payload(pa_request_id)
        
        # Submit to payer API
        submission_result = self._submit_to_payer(fhir_payload)
        
        result = {
            'requestId': pa_request_id,
            'authId': submission_result['authorizationId'],
            'status': submission_result['status'],
            'payloadSize': len(json.dumps(fhir_payload)),
            'submissionTimestamp': datetime.now().isoformat(),
            'approvalDate': submission_result.get('approvalDate'),
            'expirationDate': submission_result.get('expirationDate')
        }
        
        print(f"[{self.name}] Submission complete. Status: {result['status']}")
        
        return result
    
    def _generate_fhir_payload(self, pa_request_id):
        """Generate FHIR R4 PriorAuthorization resource"""
        # Simplified FHIR structure
        return {
            'resourceType': 'Claim',
            'id': pa_request_id,
            'status': 'active',
            'type': {
                'coding': [{
                    'system': 'http://terminology.hl7.org/CodeSystem/claim-type',
                    'code': 'professional'
                }]
            },
            'use': 'preauthorization',
            'patient': {
                'reference': 'Patient/PT-12345'
            },
            'created': datetime.now().isoformat(),
            'insurer': {
                'reference': 'Organization/HUM-MA-001'
            },
            'provider': {
                'reference': 'Practitioner/DR-001'
            },
            'priority': {
                'coding': [{
                    'code': 'normal'
                }]
            },
            'diagnosis': [{
                'sequence': 1,
                'diagnosisCodeableConcept': {
                    'coding': [{
                        'system': 'http://hl7.org/fhir/sid/icd-10',
                        'code': 'M17.11',
                        'display': 'Unilateral primary osteoarthritis, right knee'
                    }]
                }
            }],
            'procedure': [{
                'sequence': 1,
                'procedureCodeableConcept': {
                    'coding': [{
                        'system': 'http://www.ama-assn.org/go/cpt',
                        'code': '27447',
                        'display': 'Total knee arthroplasty'
                    }]
                }
            }],
            'supportingInfo': [
                {
                    'sequence': 1,
                    'category': {
                        'coding': [{
                            'code': 'info',
                            'display': 'Information'
                        }]
                    },
                    'valueString': 'Failed conservative treatment for 8 months'
                }
            ]
        }
    
    def _submit_to_payer(self, fhir_payload):
        """Submit FHIR payload to payer API"""
        # In production, call actual payer FHIR API
        # For demo, simulate approval
        return {
            'authorizationId': f"AUTH-HUM-{uuid.uuid4().hex[:8].upper()}",
            'status': 'approved',
            'approvalDate': datetime.now().isoformat(),
            'expirationDate': '2024-06-30T00:00:00Z',
            'payerResponse': 'Authorization approved - all criteria met'
        }