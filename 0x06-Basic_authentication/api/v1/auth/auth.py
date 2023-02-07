#!/usr/bin/env python3
"""
Auth
"""

from flask import request
from typing import List, TypeVar


class Auth:
    """
    Auth class
    """

    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """ require_auth
        """
        if not path or not excluded_paths:
            return True
        path += '/' if path[-1] != '/' else ''
        all_path = any(rex.endswith("*") for rex in excluded_paths)
        if not all_path:
            if path in excluded_paths:
                return False
        for rex in excluded_paths:
            if rex[-1] == '*':
                if path.startswith(rex[:-1]):
                    return False
            if rex == path:
                return False
        return True

    def authorization_header(self, request=None) -> str:
        """ authorization_header
        """
        if request is None or 'Authorization' not in request.headers:
            return None
        return request.headers['Authorization']

    def current_user(self, request=None) -> TypeVar('User'):
        """ current_user
        """
        return None
