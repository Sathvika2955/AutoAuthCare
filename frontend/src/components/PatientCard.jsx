import React from 'react';

const PatientCard = () => {
  const patientData = {
    name: 'Vinay Varma',
    age: 58,
    patientId: 'PT-78392',
    procedure: 'Total Knee Arthroplasty',
    procedureCode: 'CPT-27447',
    diagnosis: 'Severe Osteoarthritis, Right Knee',
    diagnosisCode: 'M17.11',
    insurance: 'Humana Medicare Advantage',
    insuranceId: 'HUM-MA-001',
    priorSurgeries: 2,
    documentsUploaded: 5,
    documentsRequired: 5
  };

  return (
    <div className="patient-card">
      {/* Header with Icon */}
      <div className="patient-card-header">
        <div className="patient-icon">
          <i className="fas fa-user-injured"></i>
        </div>
        <div>
          <h3>Patient Information</h3>
          <span className="patient-badge priority-high">
            <i className="fas fa-exclamation-circle"></i>
            High Priority
          </span>
        </div>
      </div>

      <div className="patient-details">
        {/* Patient Name */}
        <div className="detail-group">
          <div className="detail-label">
            <i className="fas fa-user"></i>
            Patient Name
          </div>
          <div className="detail-value primary">{patientData.name}, {patientData.age}y</div>
        </div>

        {/* Patient ID */}
        <div className="detail-group">
          <div className="detail-label">
            <i className="fas fa-id-card"></i>
            Patient ID
          </div>
          <div className="detail-value code">{patientData.patientId}</div>
        </div>

        <div className="detail-divider"></div>

        {/* Procedure */}
        <div className="detail-group">
          <div className="detail-label">
            <i className="fas fa-procedures"></i>
            Procedure
          </div>
          <div className="detail-value">{patientData.procedure}</div>
          <div className="detail-subvalue">{patientData.procedureCode}</div>
        </div>

        {/* Diagnosis */}
        <div className="detail-group">
          <div className="detail-label">
            <i className="fas fa-diagnoses"></i>
            Diagnosis
          </div>
          <div className="detail-value">{patientData.diagnosis}</div>
          <div className="detail-subvalue">{patientData.diagnosisCode}</div>
        </div>

        <div className="detail-divider"></div>

        {/* Prior Surgeries */}
        <div className="detail-group">
          <div className="detail-label">
            <i className="fas fa-history"></i>
            Prior Surgeries
          </div>
          <div className="detail-value">
            {patientData.priorSurgeries} previous procedures
          </div>
          <div className="surgery-badges">
            <span className="surgery-badge">
              <i className="fas fa-check-circle"></i>
              Left Hip Replacement (2019)
            </span>
            <span className="surgery-badge">
              <i className="fas fa-check-circle"></i>
              Spinal Fusion (2021)
            </span>
          </div>
        </div>

        <div className="detail-divider"></div>

        {/* Documents Uploaded */}
        <div className="detail-group">
          <div className="detail-label">
            <i className="fas fa-file-upload"></i>
            Documents Uploaded
          </div>
          <div className="document-progress">
            <div className="document-stats">
              <span className="doc-count">
                {patientData.documentsUploaded}/{patientData.documentsRequired}
              </span>
              <span className="doc-status complete">
                <i className="fas fa-check-circle"></i>
                Complete
              </span>
            </div>
            <div className="progress-bar-doc">
              <div 
                className="progress-fill-doc" 
                style={{width: `${(patientData.documentsUploaded / patientData.documentsRequired) * 100}%`}}
              ></div>
            </div>
          </div>
          <div className="document-list">
            <div className="doc-item uploaded">
              <i className="fas fa-file-medical"></i>
              <span>Medical History</span>
              <i className="fas fa-check-circle doc-check"></i>
            </div>
            <div className="doc-item uploaded">
              <i className="fas fa-x-ray"></i>
              <span>X-Ray Results</span>
              <i className="fas fa-check-circle doc-check"></i>
            </div>
            <div className="doc-item uploaded">
              <i className="fas fa-file-prescription"></i>
              <span>Physical Therapy Records</span>
              <i className="fas fa-check-circle doc-check"></i>
            </div>
            <div className="doc-item uploaded">
              <i className="fas fa-heartbeat"></i>
              <span>Clinical Assessment</span>
              <i className="fas fa-check-circle doc-check"></i>
            </div>
            <div className="doc-item uploaded">
              <i className="fas fa-file-contract"></i>
              <span>Consent Forms</span>
              <i className="fas fa-check-circle doc-check"></i>
            </div>
          </div>
        </div>

        <div className="detail-divider"></div>

        {/* Insurance */}
        <div className="detail-group">
          <div className="detail-label">
            <i className="fas fa-shield-alt"></i>
            Insurance
          </div>
          <div className="detail-value">{patientData.insurance}</div>
          <div className="detail-subvalue">{patientData.insuranceId}</div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="patient-card-footer">
        <div className="status-badge ready">
          <i className="fas fa-clipboard-check"></i>
          Ready for Processing
        </div>
      </div>
    </div>
  );
};

export default PatientCard;