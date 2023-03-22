export default class Building {
  constructor(sqft = 0) {
    if (
      this.constructor !== Building &&
      this.evacuationWarningMessage === undefined
    ) {
      throw new Error(
        'Class extending Building must override evacuationWarningMessage'
      );
    }
    this._sqft = sqft;
  }

  get sqft() {
    return this._sqft;
  }

  set sqft(Newsqft) {
    this._sqft = Newsqft;
  }
}
