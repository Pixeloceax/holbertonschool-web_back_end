#!/usr/bin/env python3
"""MRUCache module"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """MRUCache class"""

    def __init__(self):
        """Constructor"""
        super().__init__()
        self.cache_list = []

    def put(self, key, item):
        """Assign to the dictionary the item value for the key"""
        if key in self.cache_list:
            self.cache_list.remove(key)
        if len(self.cache_data) == BaseCaching.MAX_ITEMS:
            MostRecentlyUsedKey = self.cache_list.pop()
            del self.cache_data[MostRecentlyUsedKey]
            print("DISCARD: {}".format(MostRecentlyUsedKey))
        if key and item:
            self.cache_list.insert(0, key)
            self.cache_data[key] = item

    def get(self, key):
        """Return the value in self.cache_data linked to key"""
        if key and key in self.cache_data:
            self.cache_list.remove(key)
            self.cache_list.insert(0, key)
            return self.cache_data[key]
        return None
