export default class Currency {
  constructor(name = '', code = '') {
    this._name = name;
    this._code = code;
  }

  get name() {
    return this._name;
  }

  set name(Newname) {
    if (typeof Newname !== 'string') {
      throw new TypeError('Name must be a string');
    }
  }

  get code() {
    return this._code;
  }

  set code(Newcode) {
    if (typeof Newcode !== 'string') {
      throw new TypeError('Code must be a string');
    }
  }

  displayFullCurrency() {
    return `${this._code} (${this._name})`;
  }
}
