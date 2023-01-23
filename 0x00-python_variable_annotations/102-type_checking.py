#!/usr/bin/env python3
"""
102-type_checking.py
"""

from typing import List, Tuple


def zoom_array(lst: Tuple, factor: int = 2) -> List:
    """
    zoom_array - takes a tuple of floats
    and returns a tuple of floats
    """
    zoomed_in: List = [
        item for item in lst
        for i in range(factor)
    ]
    return zoomed_in


array = [12, 72, 91]

zoom_2x = zoom_array(tuple(array))

zoom_3x = zoom_array(tuple(array), int(3.0))
