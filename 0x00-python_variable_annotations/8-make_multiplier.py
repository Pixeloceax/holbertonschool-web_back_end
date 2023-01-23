#!/usr/bin/env python3
"""
8-make_multiplier.py
"""


def make_multiplier(m: float) -> callable:
    """make_multiplier: takes a float m as argument
    and returns a function that multiplies a float by m."""
    def multiplier(x: float) -> float:
        return x * m
    return multiplier
