#!/usr/bin/env python3
""" BasicCache module """
base_caching = __import__('base_caching').BaseCaching


class BasicCache(base_caching):
    """ BasicCache class """

    def put(self, key, item):
        """ Assign to the dictionary the item value for the key """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ Return the value in self.cache_data linked to key """
        if key and key in self.cache_data:
            return self.cache_data[key]
        return None
