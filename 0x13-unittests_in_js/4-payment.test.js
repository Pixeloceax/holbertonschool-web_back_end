const sinon = require("sinon");
const { expect } = require("chai");
const sendPaymentRequestToApi = require("./4-payment");
const Utils = require("./utils");

describe("sendPaymentRequestToApi", () => {
  it("should call Utils.calculateNumber with SUM, 100, and 20", () => {
    const stub = sinon.stub(Utils, "calculateNumber").returns(10);
    const spy = sinon.spy(console, "log");
    sendPaymentRequestToApi(100, 20);
    expect(stub.calledOnceWithExactly("SUM", 100, 20)).to.be.true;
    expect(spy.calledOnceWithExactly("The total is: 10")).to.be.true;
    stub.restore();
    spy.restore();
  });
});
