#!/usr/bin/env python3
"""
Main file
"""

import redis
import uuid
from functools import wraps
import ast
from typing import *


def count_calls(method: Callable) -> Callable:
    """
    Count calls
    """
    key = method.__qualname__

    @wraps(method)
    def wrapper(self, *args, **kwds):
        """
        Wrapper
        """
        self._redis.incr(key)
        return method(self, *args, **kwds)
    return wrapper


def call_history(method: Callable) -> Callable:
    """
    call_history method
    """
    inputs = method.__qualname__ + ":inputs"
    outputs = method.__qualname__ + ":outputs"

    @wraps(method)
    def wrapper(self, *args, **kwargs):
        """
        wrapper method
        """
        self._redis.rpush(inputs, str(args))
        value = method(self, *args, **kwargs)
        self._redis.rpush(outputs, value)
        return value
    return wrapper


def replay(method: Callable) -> None:
    """
    replay method
    """
    inputs = method.__qualname__ + ":inputs"
    outputs = method.__qualname__ + ":outputs"
    count = method.__qualname__

    r = redis.Redis()
    count = r.get(count).decode('utf-8')
    print("{} was called {} times:".format(method.__qualname__, count))
    inputs = r.lrange(inputs, 0, -1)
    outputs = r.lrange(outputs, 0, -1)
    for i, o in zip(inputs, outputs):
        print("{}(*{}) -> {}".format(method.__qualname__, i.decode('utf-8'),
                                     o.decode('utf-8')))


class Cache:
    """
    Cache class
    """

    def __init__(self) -> None:
        """
        Constructor
        """
        self._redis = redis.Redis()
        self._redis.flushdb()

    @count_calls
    @call_history
    def store(self, data: Union[str, bytes, int, float]) -> str:
        """
        Store data in redis
        """
        key = str(uuid.uuid4())
        self._redis.set(key, data)
        return key

    def get(self, key: str, fn=None) -> bytes:
        """
        Get data from redis
        """
        data = self._redis.get(key)
        if fn:
            return fn(data)
        return data

    def get_str(self, key: str) -> str:
        """
        Get data from redis as string
        """
        return self.get(key, str)

    def get_int(self, key: str) -> int:
        """
        Get data from redis as int
        """
        return self.get(key, int)
