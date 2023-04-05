const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

const Utils = require("./utils");
const sendPaymentRequestToApi = require("./3-payment");

describe("sendPaymentRequestToApi", () => {
  it("calls Utils.calculateNumber with type SUM and correct arguments", () => {
    const calculateNumberSpy = sinon.spy(Utils, "calculateNumber");
    sendPaymentRequestToApi(100, 20);
    expect(calculateNumberSpy.calledOnceWithExactly("SUM", 100, 20)).to.be.true;
    calculateNumberSpy.restore();
  });
});
