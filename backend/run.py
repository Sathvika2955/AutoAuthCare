
import sys
import os

# Add the parent directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Now import and run the Flask app
from api.main import app

if __name__ == '__main__':
    print("=" * 60)
    print("AutoAuth Agent Platform - Backend Server")
    print("=" * 60)
    print("\nStarting Flask server...")
    print("Backend running on: http://localhost:5000")
    print("API endpoints available at: http://localhost:5000/api/")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 60)
    print()
    
    app.run(debug=True, host='0.0.0.0', port=5000)