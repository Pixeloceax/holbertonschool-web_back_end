#!/usr/bin/env python3
"""
app     file
"""

from flask import Flask, jsonify, request
from flask import abort
from flask import redirect
from auth import Auth

app = Flask(__name__)
AUTH = Auth()


@app.route('/', methods=['GET'], strict_slashes=False)
def welcome() -> str:
    """
    Welcome message
    """
    return jsonify({"message": "Bienvenue"})


@app.route('/users', methods=['POST'], strict_slashes=False)
def users() -> str:
    """
    Register a new user
    """
    try:
        AUTH.register_user(request.form.get('email'),
                           request.form.get('password'))
        return jsonify({"email": request.form.get('email'),
                        "message": "user created"})
    except ValueError:
        return jsonify({"message": "email already registered"}), 400


@app.route('/sessions', methods=['POST'], strict_slashes=False)
def login() -> str:
    """
    Login
    """
    if AUTH.valid_login(request.form.get('email'),
                        request.form.get('password')):
        response = jsonify(
            {"email": request.form.get('email'), "message": "logged in"})
        response.set_cookie('session_id', AUTH.create_session(
            request.form.get('email')))
        return response
    else:
        abort(401)


@app.route('/sessions', methods=['DELETE'], strict_slashes=False)
def logout() -> str:
    """
    Logout
    """
    if AUTH.destroy_session(request.cookies.get('session_id')):
        return redirect('/')
    else:
        abort(403)


@app.route('/profile', methods=['GET'], strict_slashes=False)
def profile() -> str:
    """
    Profile
    """
    if AUTH.current_user(request.cookies.get('session_id')):
        return jsonify({"email": AUTH.current_user(request.cookies.get(
            'session_id')).email})
    else:
        abort(403)


@app.route('/reset_password', methods=['POST'], strict_slashes=False)
def get_reset_password_token() -> str:
    """
    Get reset password token
    """
    try:
        return jsonify({"email": request.form.get('email'),
                        "reset_token": AUTH.get_reset_password_token
                        (request.form.get('email'))})
    except ValueError:
        abort(403)


@app.route('/reset_password', methods=['PUT'], strict_slashes=False)
def update_password() -> str:
    """
    Update password
    """
    try:
        AUTH.update_password(request.form.get('reset_token'),
                             request.form.get('password'))
        return jsonify({"email": request.form.get('email'),
                        "message": "Password updated"})
    except ValueError:
        abort(403)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
