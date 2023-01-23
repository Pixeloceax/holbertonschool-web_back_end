#!/usr/bin/env python3
"""
7-to_kv.py
"""

from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """to_kv: takes a string k and an int OR float v as arguments and returns a tuple."""
    return (k, v * v)
