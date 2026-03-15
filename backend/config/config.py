"""
AutoAuth Agent Platform Configuration
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    
    # Database
    DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://localhost/autoauth')
    
    # FHIR API
    FHIR_BASE_URL = os.getenv('FHIR_BASE_URL', 'https://fhir.example.com/R4')
    FHIR_AUTH_TOKEN = os.getenv('FHIR_AUTH_TOKEN', '')
    
    # NLP Models
    BIOBERT_MODEL_PATH = os.getenv('BIOBERT_MODEL_PATH', './models/biobert')
    CLINICALBERT_MODEL_PATH = os.getenv('CLINICALBERT_MODEL_PATH', './models/clinicalbert')
    
    # RAG Configuration
    PINECONE_API_KEY = os.getenv('PINECONE_API_KEY', '')
    PINECONE_ENV = os.getenv('PINECONE_ENV', 'us-west1-gcp')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
    
    # Agent Configuration
    AGENT_TIMEOUT = int(os.getenv('AGENT_TIMEOUT', '30'))  # seconds
    MAX_RETRIES = int(os.getenv('MAX_RETRIES', '3'))
    
    # Payer APIs
    HUMANA_API_KEY = os.getenv('HUMANA_API_KEY', '')
    AETNA_API_KEY = os.getenv('AETNA_API_KEY', '')
    CIGNA_API_KEY = os.getenv('CIGNA_API_KEY', '')

class DevelopmentConfig(Config):
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}