#!/usr/bin/python3
"""LIFOCache module"""
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache """

    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Constructor"""
        if key and item:
            if key in list(self.cache_data.keys()):
                del self.cache_data[key]
            if (len(self.cache_data.keys()) == self.MAX_ITEMS):
                k = list(self.cache_data.keys()).pop()
                del self.cache_data[k]
                print("DISCARD: {}".format(k))
            self.cache_data[key] = item

    def get(self, key):
        """Return the value in self.cache_data linked to key"""
        if key in self.cache_data:
            return self.cache_data[key]
        return None
