import React from 'react';

const PatientCard = () => {
  const patientData = {
    name: 'John Doe',
    age: 65,
    patientId: 'PT-12345',
    procedure: 'Total Knee Arthroplasty',
    procedureCode: 'CPT-27447',
    diagnosis: 'Severe Osteoarthritis, Right Knee',
    diagnosisCode: 'M17.11',
    insurance: 'Humana Medicare Advantage',
    insuranceId: 'HUM-MA-001'
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
        <div className="status-badge pending">
          <i className="fas fa-clock"></i>
          Pending PA
        </div>
      </div>
    </div>
  );
};

export default PatientCard;