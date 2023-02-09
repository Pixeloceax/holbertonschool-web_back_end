#!/usr/bin/env python3
"""
Module of Session views 223
"""

from api.v1.views import app_views
from flask import request, jsonify
from models.user import User
from api.v1.app import *
from os import getenv


@app_views.route('/auth_session/login', methods=['POST'], strict_slashes=False)
def login() -> str:
    """
    POST /api/v1/auth_session/login
    """
    email = request.form.get('email')
    password = request.form.get('password')

    if not email:
        return jsonify({"error": "email missing"}), 400
    if not password:
        return jsonify({"error": "password missing"}), 400

    users = User.search({'email': email})

    if not users:
        return jsonify({"error": "no user found for this email"}), 404

    for user in users:
        if not user.is_valid_password(password):
            return jsonify({"error": "wrong password"}), 401
        session_auth = SessionAuth()
        session_id = session_auth.create_session(user.id)
        response = jsonify(user.to_json())
        if getenv('SESSION_NAME'):
            response.set_cookie(getenv('SESSION_NAME'), session_id)
        return response


@app_views.route('/auth_session/logout',
                 methods=['DELETE'],
                 strict_slashes=False)
def logout():
    """
    DELETE /api/v1/auth_session/logout
    """
    if auth.destroy_session(request):
        return jsonify({}), 200
    else:
        abort(404)
