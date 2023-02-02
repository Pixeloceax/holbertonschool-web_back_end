#!/usr/bin/env python3
""" filtered_logger.py """
import logging
import re
import os
import mysql.connector

PII_FIELDS = ("name", "email", "phone", "ssn", "password")


class RedactingFormatter(logging.Formatter):
    """ Redacting Formatter class
        """

    REDACTION = "***"
    FORMAT = "[HOLBERTON] %(name)s %(levelname)s %(asctime)-15s: %(message)s"
    SEPARATOR = ";"

    def __init__(self, fields=None):
        super(RedactingFormatter, self).__init__(self.FORMAT)
        self.fields = fields or []

    def format(self, record: logging.LogRecord) -> str:
        for field in self.fields:
            record.msg = re.sub(
                f"{field}=\S+?;", f"{field}={self.REDACTION};", record.msg)
        return super().format(record)


def get_logger() -> logging.Logger:
    logger = logging.getLogger("user_data")
    logger.setLevel(logging.INFO)
    logger.propagate = False
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(RedactingFormatter(PII_FIELDS))
    logger.addHandler(stream_handler)
    return logging.Logger


def get_db():

    username = os.environ.get("PERSONAL_DATA_DB_USERNAME", "root")
    password = os.environ.get("PERSONAL_DATA_DB_PASSWORD", "")
    host = os.environ.get("PERSONAL_DATA_DB_HOST", "localhost")
    db_name = os.environ.get("PERSONAL_DATA_DB_NAME")

    if not db_name:
        raise ValueError("PERSONAL_DATA_DB_NAME not set in environment")

    return mysql.connector.connect(
        host=host,
        user=username,
        password=password,
        database=db_name
    )
