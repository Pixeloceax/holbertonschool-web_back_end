#!/usr/bin/env python3
"""
Web module
"""

import requests


def get_page(url: str) -> str:
    """
    Get page
    """
    r = requests.get(url)
    return r.text
