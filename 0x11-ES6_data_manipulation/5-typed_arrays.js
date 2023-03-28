export default function createInt8TypedArray(length, position, value) {
  if (position >= length || position < 0) {
    throw new Error('Position outside range');
  }
  const int8 = new Int8Array(length);
  int8[position] = value;

  const { arraybuffer } = int8;
  const result = new DataView(arraybuffer, 0, length);
  return result;
}
