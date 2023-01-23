#!/usr/bin/env python3
"""
9-element_length.py
"""

from typing import Iterable, Sequence, Tuple, List


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """element_length: takes a list lst of iterables and returns a tuple."""
    return (lst, len(lst))
