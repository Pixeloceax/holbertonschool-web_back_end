const assert = require("assert");
const calculateNumber = require("./0-calcul");

describe("calculateNumber", function () {
  it("should return 4 when passed 1 and 3", function () {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it("should return 4 when passed 1 and 3.4", function () {
    assert.strictEqual(calculateNumber(1, 3.4), 4);
  });

  it("should return 5 when passed 1 and 3.6", function () {
    assert.strictEqual(calculateNumber(1, 3.6), 5);
  });

  it("should return 4 when passed 1.4 and 3", function () {
    assert.strictEqual(calculateNumber(1.4, 3), 4);
  });

  it("should return 5 when passed 1.6 and 3", function () {
    assert.strictEqual(calculateNumber(1.6, 3), 5);
  });

  it("should return 4 when passed 1.4 and 3.4", function () {
    assert.strictEqual(calculateNumber(1.4, 3.4), 4);
  });

  it("should return 5 when passed 1.4 and 3.6", function () {
    assert.strictEqual(calculateNumber(1.4, 3.6), 5);
  });

  it("should return 5 when passed 1.6 and 3.4", function () {
    assert.strictEqual(calculateNumber(1.6, 3.4), 5);
  });

  it("should return 6 when passed 1.6 and 3.6", function () {
    assert.strictEqual(calculateNumber(1.6, 3.6), 6);
  });

  it("should return 2 when passed -1 and 3", function () {
    assert.strictEqual(calculateNumber(-1, 3), 2);
  });

  it("should return -2 when passed 1 and -3", function () {
    assert.strictEqual(calculateNumber(1, -3), -2);
  });

  it("should return 2 when passed -1.4 and 3", function () {
    assert.strictEqual(calculateNumber(-1.4, 3), 2);
  });

  it("should return 1 when passed -1.6 and 3", function () {
    assert.strictEqual(calculateNumber(-1.6, 3), 1);
  });

  it("should return -2 when passed 1 and -3.4", function () {
    assert.strictEqual(calculateNumber(1, -3.4), -2);
  });

  it("should return -3 when passed 1 and -3.6", function () {
    assert.strictEqual(calculateNumber(1, -3.6), -3);
  });

  it("should return -2 when passed 1.4 and -3.4", function () {
    assert.strictEqual(calculateNumber(1.4, -3.4), -2);
  });

  it("should return -1 when passed 1.6 and -3.4", function () {
    assert.strictEqual(calculateNumber(1.6, -3.4), -1);
  });

  it("should return -3 when passed 1.4 and -3.6", function () {
    assert.strictEqual(calculateNumber(1.4, -3.6), -3);
  });

  it("should return -2 when passed 1.6 and -3.6", function () {
    assert.strictEqual(calculateNumber(1.6, -3.6), -2);
  });

  it("should return 2 when passed -1.4 and 3.4", function () {
    assert.strictEqual(calculateNumber(-1.4, 3.4), 2);
  });

  it("should return 2 when passed -1.6 and 3.4", function () {
    assert.strictEqual(calculateNumber(-1.6, 3.4), 1);
  });

  it("should return 2 when passed -1.4 and 3.6", function () {
    assert.strictEqual(calculateNumber(-1.4, 3.6), 3);
  });

  it("should return 2 when passed -1.6 and 3.6", function () {
    assert.strictEqual(calculateNumber(-1.6, 3.6), 2);
  });

  it("should return 0 when passed 0 and 0", function () {
    assert.strictEqual(calculateNumber(0, 0), 0);
  });

  it("should return 1 when passed 0 and 1", function () {
    assert.strictEqual(calculateNumber(0, 1), 1);
  });

  it("should return 0 when passed 0 and 0.4", function () {
    assert.strictEqual(calculateNumber(0, 0.4), 0);
  });

  it("should return 1 when passed 0 and 0.6", function () {
    assert.strictEqual(calculateNumber(0, 0.6), 1);
  });

  it("should return 0 when passed 0.4 and 0", function () {
    assert.strictEqual(calculateNumber(0.4, 0), 0);
  });

  it("should return 1 when passed 0.6 and 0", function () {
    assert.strictEqual(calculateNumber(0.6, 0), 1);
  });

  it("should return 1 when passed 0.6 and 0.6", function () {
    assert.strictEqual(calculateNumber(0.6, 0.6), 2);
  });

  it("should return -1 when passed -0.6 and -0.6", function () {
    assert.strictEqual(calculateNumber(-0.6, -0.6), -2);
  });

  it("should return 0 when passed -0.4 and 0", function () {
    assert.strictEqual(calculateNumber(-0.4, 0), 0);
  });

  it("should return 0 when passed -0.6 and 0", function () {
    assert.strictEqual(calculateNumber(-0.6, 0), -1);
  });

  it("should return 0 when passed 0 and -0.4", function () {
    assert.strictEqual(calculateNumber(0, -0.4), 0);
  });

  it("should return 1 when passed 0 and -0.6", function () {
    assert.strictEqual(calculateNumber(0, -0.6), -1);
  });

  it("should return NaN when passed NaN and 1", function () {
    assert(isNaN(calculateNumber(NaN, 1)));
  });

  it("should return NaN when passed 1 and NaN", function () {
    assert(isNaN(calculateNumber(1, NaN)));
  });

  it("should return NaN when passed NaN and NaN", function () {
    assert(isNaN(calculateNumber(NaN, NaN)));
  });

  it("should return 1 when passed 1 and Infinity", function () {
    assert.strictEqual(calculateNumber(1, Infinity), Infinity);
  });

  it("should return 1 when passed Infinity and 1", function () {
    assert.strictEqual(calculateNumber(Infinity, 1), Infinity);
  });

  it("should return 1 when passed Infinity and Infinity", function () {
    assert.strictEqual(calculateNumber(Infinity, Infinity), Infinity);
  });

  it("should return -1 when passed -1 and -Infinity", function () {
    assert.strictEqual(calculateNumber(-1, -Infinity), -Infinity);
  });

  it("should return -1 when passed -Infinity and -1", function () {
    assert.strictEqual(calculateNumber(-Infinity, -1), -Infinity);
  });

  it("should return -1 when passed -Infinity and -Infinity", function () {
    assert.strictEqual(calculateNumber(-Infinity, -Infinity), -Infinity);
  });
});
