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
    def wrapper(*args, **kwds):
        """
        Wrapper
        """
        args[0]._redis.incr(key)
        return method(*args, **kwds)

    return wrapper


def call_history(method: Callable) -> Callable:
    """
    Call history
    """
    key = method.__qualname__

    @wraps(method)
    def wrapper(*args, **kwds):
        """
        Wrapper
        """
        args[0]._redis.rpush("{}:inputs".format(key), str(args[1:]))
        result = method(*args, **kwds)
        args[0]._redis.rpush("{}:outputs".format(key), str(result))
        return result

    return wrapper


def replay(method: Callable) -> None:
    """
    Replay function that shows the history of calls of a particular function
    """
    inputs_key = method.__qualname__ + ":inputs"
    outputs_key = method.__qualname__ + ":outputs"
    inputs = Cache._redis.lrange(inputs_key, 0, -1)
    outputs = Cache._redis.lrange(outputs_key, 0, -1)
    count = len(inputs)
    print(f"{method.__qualname__} was called {count} times:")
    for i, (input_str, output_str) in enumerate(zip(inputs, outputs)):
        input_repr = ", ".join(ast.literal_eval(input_str.decode()))
        output_repr = output_str.decode()
        print(f"{method.__qualname__}(*({input_repr},)) -> {output_repr}")


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
