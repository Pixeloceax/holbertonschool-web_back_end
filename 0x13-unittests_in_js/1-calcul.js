const SUM = "SUM";
const SUBTRACT = "SUBTRACT";
const DIVIDE = "DIVIDE";

const isNegZero = (n) => {
  n = Number(n);
  return n === 0 && 1 / n === -Infinity;
};

const calculateNumber = (type, a = 0, b = 0) => {
  let aNum = Number(a);
  let bNum = Number(b);

  if (isNaN(aNum) || isNaN(bNum))
    throw TypeError("Parameters must be numbers or able to coerce to number");

  aNum = Math.round(aNum);
  bNum = Math.round(bNum);

  switch (type) {
    case SUM:
      return aNum + bNum;
    case SUBTRACT:
      return aNum - bNum;
    case DIVIDE:
      if (bNum === 0) return "ERROR";
      const quotient = aNum / bNum;
      return isNegZero(quotient) ? 0 : quotient;
    default:
      throw Error(
        `Invalid operation type. Valid types are "${SUM}", "${SUBTRACT}", and "${DIVIDE}".`
      );
  }
};

module.exports = calculateNumber;
