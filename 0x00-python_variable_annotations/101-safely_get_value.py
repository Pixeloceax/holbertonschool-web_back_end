#!/usr/bin/env python3
"""
101-safely_get_value.py
"""
from typing import Any, Mapping, Union, TypeVar


def safely_get_value(dct: Mapping, key: Any, default: Union[TypeVar('T'), None] = None) -> Union[Any, TypeVar('T')]:
    if key in dct:
        return dct[key]
    else:
        return default
