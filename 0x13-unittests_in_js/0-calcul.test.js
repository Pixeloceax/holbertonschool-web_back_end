const assert = require("assert");
const calculateNumber = require("./0-calcul");

describe("calculateNumber", () => {
  it("should return the sum of two rounded numbers", () => {
    const result = calculateNumber(2.4, 3.5);
    assert.strictEqual(result, 6);
  });

  it("should return the sum of a positive rounded number and a negative rounded number", () => {
    const result = calculateNumber(2.4, -3.5);
    assert.strictEqual(result, -1);
  });

  it("should return the sum of two whole numbers", () => {
    const result = calculateNumber(2, 3);
    assert.strictEqual(result, 5);
  });

  it("should return the sum of two negative rounded numbers", function () {
    assert.strictEqual(calculateNumber(-3.7, -2.2), -6);
  });

  it("should return the sum of two negative whole numbers", function () {
    assert.strictEqual(calculateNumber(-3, -2), -5);
  });

  it("should return the sum of two positive numbers", function () {
    assert.strictEqual(calculateNumber(2, 3), 5);
  });

  it("should return the sum of a positive and a negative number", function () {
    assert.strictEqual(calculateNumber(2, -3), -1);
  });

  it("should return the sum of two negative numbers", function () {
    assert.strictEqual(calculateNumber(-2, -3), -5);
  });

  it("should return NaN if one of the inputs is not a number", function () {
    assert(isNaN(calculateNumber("foo", 2)));
    assert(isNaN(calculateNumber(2, "bar")));
  });

  it("should return NaN if both inputs are not numbers", () => {
    assert(isNaN(calculateNumber("foo", "bar")));
  });

  it("should return Infinity if one of the inputs is Infinity", () => {
    assert.strictEqual(calculateNumber(Infinity, 2), Infinity);
    assert.strictEqual(calculateNumber(2, Infinity), Infinity);
  });

  it("should return -Infinity if one of the inputs is -Infinity", () => {
    assert.strictEqual(calculateNumber(-Infinity, 2), -Infinity);
    assert.strictEqual(calculateNumber(2, -Infinity), -Infinity);
  });

  it("should return NaN if one of the inputs is NaN", () => {
    assert(isNaN(calculateNumber(NaN, 2)));
    assert(isNaN(calculateNumber(2, NaN)));
  });

  it("should return NaN if both inputs are NaN", () => {
    assert(isNaN(calculateNumber(NaN, NaN)));
  });

  it("should return 0 if one of the inputs is 0", () => {
    assert.strictEqual(calculateNumber(0, 2), 2);
    assert.strictEqual(calculateNumber(2, 0), 2);
  });

  it("should return 0 if both inputs are 0", () => {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });
});
