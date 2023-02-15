#!/usr/bin/env python3
"""
Auth module
"""

import bcrypt
from db import DB
from user import User
from uuid import uuid4
from sqlalchemy.orm.exc import NoResultFound
from typing import Union


def _hash_password(password: str) -> str:
    """
    Hash a password
    """
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


def _generate_uuid() -> str:
    """
    Generate a UUID
    """
    return str(uuid4())


class Auth:
    """Auth class to interact with the authentication database.
    """

    def __init__(self):
        """
        Initialize an Auth instance
        """
        self._db = DB()

    def register_user(self, email: str, password: str) -> User:
        """
        Register a new user
        """
        try:
            self._db.find_user_by(email=email)
        except Exception:
            hashed_password = _hash_password(password)
            self._db.add_user(email, hashed_password)
            return self._db.find_user_by(email=email)
        raise ValueError(f'User {email} already exists')

    def valid_login(self, email: str, password: str) -> bool:
        """
        Validate login
        """
        try:
            return bcrypt.checkpw(password.encode('utf-8'),
                                  self._db.find_user_by
                                  (email=email).hashed_password)
        except Exception:
            return False

    def create_session(self, email: str) -> str:
        """
        Create a new session
        """
        try:
            self._db.update_user(self._db.find_user_by(
                email=email).id, session_id=_generate_uuid())
            return _generate_uuid()
        except Exception:
            return None

    def get_user_from_session_id(self, session_id: str) -> Union[User, None]:
        """
        Get a user from a session ID
        """

        if session_id is None or type(session_id) is not str:
            return None

        try:
            user = self._db.find_user_by(session_id=session_id)
            return user
        except NoResultFound:
            return None

    def destroy_session(self, user_id: int) -> None:
        """
        Destroy a session
        """
        try:
            self._db.update_user(user_id, session_id=None)
        except Exception:
            return None

    def get_reset_password_token(self, email: str) -> str:
        """
        Get reset password token
        """
        try:
            self._db.update_user(self._db.find_user_by(
                email=email).id, reset_token=_generate_uuid())
            return _generate_uuid()
        except Exception:
            raise ValueError

    def update_password(self, reset_token: str, password: str) -> None:
        """
        Update password
        """
        try:
            self._db.update_user(self._db.find_user_by(
                reset_token=reset_token).id,
                hashed_password=_hash_password(password),
                reset_token=None)
        except Exception:
            raise ValueError
