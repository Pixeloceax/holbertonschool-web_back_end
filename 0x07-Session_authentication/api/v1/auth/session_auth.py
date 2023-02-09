#!/usr/bin/env python3
"""
Module of Auth views
"""

from api.v1.auth.auth import Auth
from uuid import uuid4
from models.user import User


class SessionAuth(Auth):
    """ SessionAuth class
    """
    user_id_by_session_id = {}

    def create_session(self, user_id: str = None) -> str:
        """ create_session
        """
        if user_id is None or not isinstance(user_id, str):
            return None
        id_session = str(uuid4())
        self.user_id_by_session_id[id_session] = user_id
        return id_session

    def user_id_for_session_id(self, session_id: str = None) -> str:
        """ user_id_for_session_id
        """
        if session_id is None or not isinstance(session_id, str):
            return None
        return self.user_id_by_session_id.get(session_id)

    def current_user(self, request=None):
        """ current_user
        """
        session_id = self.session_cookie(request)
        return User.get(self.user_id_for_session_id(session_id))

    def destroy_session(self, request=None):
        """ destroy_session method
        """
        session_cookie = self.session_cookie(request)
        user_id = self.user_id_for_session_id(session_cookie)

        if not request or not session_cookie or not user_id:
            return False

        del self.user_id_by_session_id[session_cookie]
        return True
