"""
PA Request Data Model
"""
from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class PARequest(Base):
    __tablename__ = 'pa_requests'
    
    id = Column(String(50), primary_key=True)
    patient_id = Column(String(50), nullable=False)
    procedure_code = Column(String(20), nullable=False)
    procedure_name = Column(String(200), nullable=False)
    diagnosis_code = Column(String(20), nullable=False)
    payer_id = Column(String(50), nullable=False)
    status = Column(Enum('pending', 'processing', 'approved', 'denied'), default='pending')
    priority = Column(Enum('low', 'medium', 'high', 'urgent'), default='medium')
    submitted_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)
    authorization_id = Column(String(50), nullable=True)
    
    def __repr__(self):
        return f"<PARequest(id='{self.id}', status='{self.status}')>"