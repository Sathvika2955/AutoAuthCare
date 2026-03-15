"""
Authentication and Authorization Module
"""
from functools import wraps
from flask import request, jsonify
import os

# Simple token-based auth
ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', 'ADMIN_SECRET_2024_AUTOAUTH')
USER_TOKEN = os.getenv('USER_TOKEN', 'USER_SECRET_2024_AUTOAUTH')

def get_user_role(token):
    """Get user role from token"""
    if token == ADMIN_TOKEN:
        return 'admin'
    elif token == USER_TOKEN:
        return 'user'
    return None

def require_auth(required_role=None):
    """
    Decorator to require authentication
    Usage:
        @require_auth()  - any authenticated user
        @require_auth('admin')  - only admin
        @require_auth('user')  - user or admin
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Get token from header
            auth_header = request.headers.get('Authorization')
            
            if not auth_header:
                return jsonify({
                    'error': 'No authorization token provided',
                    'message': 'Please provide Authorization header with Bearer token'
                }), 401
            
            # Extract token
            try:
                token = auth_header.replace('Bearer ', '')
            except:
                return jsonify({'error': 'Invalid authorization header format'}), 401
            
            # Get role
            role = get_user_role(token)
            
            if not role:
                return jsonify({'error': 'Invalid token'}), 401
            
            # Check role requirement
            if required_role:
                if required_role == 'admin' and role != 'admin':
                    return jsonify({
                        'error': 'Insufficient permissions',
                        'message': 'Admin access required'
                    }), 403
            
            # Add role to request context
            request.user_role = role
            
            return f(*args, **kwargs)
        
        return decorated_function
    return decorator

def get_current_user_role():
    """Get current user's role from request context"""
    return getattr(request, 'user_role', None)