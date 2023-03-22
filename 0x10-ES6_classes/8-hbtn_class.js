export default class HolbertonClass {
  constructor(size = 0, location = '') {
    this._size = size;
    this._location = location;
  }

  get size() {
    return this._size;
  }

  set size(newSize) {
    this._size = newSize;
  }

  get location() {
    return this._location;
  }

  set location(newLocation) {
    this._location = newLocation;
  }

  [Symbol.toPrimitive](value) {
    if (value === 'string') {
      return this._location;
    }
    return this._size;
  }

  [Symbol.toStringTag]() {
    return 'HolbertonClass';
  }
}
