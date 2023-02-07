#!/usr/bin/env python3
""" Auth"""

from flask import request
from typing import List, TypeVar


class Auth:

    def require_auth(self, path: str, excluded_paths: List[str]) -> bool:
        """ require_auth
        """
        if path is None or excluded_paths is None or\
                not isinstance(excluded_paths, list):
            return(True)
        if path[-1] != '/':
            path += '/'
        if path in excluded_paths:
            return(False)
        for excluded_path in excluded_paths:
            if excluded_path[-1] != '/':
                excluded_path += '/'
            if excluded_path.endswith('*'):
                if path.startswith(excluded_path[:-1]):
                    return(False)
        return(True)

    def authorization_header(self, request=None) -> str:
        """ authorization_header
        """
        if request is None:
            return(None)
        return(request.headers.get('Authorization'))

    def current_user(self, request=None) -> TypeVar('User'):
        """ current_user
        """
        return(None)
