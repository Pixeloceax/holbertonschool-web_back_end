#!/usr/bin/env python3
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFOCache class"""

    def __init__(self):
        """Constructor"""
        super().__init__()

    def put(self, key, item):
        """Assign to the dictionary the item value for the key"""
        if len(self.cache_data) == BaseCaching.MAX_ITEMS:
            KeyToRemove = sorted(self.cache_data)[0]
            print("DISCARD: {}".format(KeyToRemove))
            self.cache_data.pop(KeyToRemove)
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """Return the value in self.cache_data linked to key"""
        if key and key in self.cache_data:
            return self.cache_data[key]
        return None
