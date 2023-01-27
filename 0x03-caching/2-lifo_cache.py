#!/usr/bin/env python3
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """LIFOCache class"""

    def __init__(self):
        """Constructor"""
        super().__init__()

    def put(self, key, item):
        """Assign to the dictionary the item value for the key"""
        if key in list(self.cache_data.keys()):
            del self.cache_data[key]
        if len(self.cache_data) == BaseCaching.MAX_ITEMS:
            KeyToRemove = list(self.cache_data.keys()).pop()
            del self.cache_data[KeyToRemove]
            print("DISCARD: {}".format(KeyToRemove))
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """Return the value in self.cache_data linked to key"""
        if key and key in self.cache_data:
            return self.cache_data[key]
        return None
