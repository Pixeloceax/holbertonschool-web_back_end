export default class Currency {
  constructor(name = '', code = '') {
    this._name = name;
    this._code = code;
  }

  get name() {
    return this._name;
  }

  set name(Newname) {
    this._name = Newname;
  }

  get code() {
    return this._code;
  }

  set code(Newcode) {
    this._code = Newcode;
  }

  displayFullCurrency() {
    return `${this._code} (${this._name})`;
  }
}
