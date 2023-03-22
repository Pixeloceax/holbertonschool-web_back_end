import Currency from './3-currency';

export default class Pricing {
  constructor(amount = 0, currency = Currency()) {
    this._amount = amount;
    this._currency = currency;
  }

  get amount() {
    return this._amount;
  }

  set amount(Newamount) {
    this._amount = Newamount;
  }

  get currency() {
    return this._currency;
  }

  set currency(Newcurrency) {
    this._currency = Newcurrency;
  }

  displayFullPrice() {
    return `${this._amount} ${this._currency.displayFullCurrency()}`;
  }

  static convertPrice(amount = 0, conversionRate = 0) {
    return amount * conversionRate;
  }
}
