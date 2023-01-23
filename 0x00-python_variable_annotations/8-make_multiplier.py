#!/usr/bin/env python3
"""8-make_multiplier.py"""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """make_multiplier function"""
    def reterned_function(number: float) -> float:
        """reterned_function function"""
        return number * multiplier
    return reterned_function
