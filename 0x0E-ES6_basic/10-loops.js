export default function appendToEachArrayValue(array, appendString) {
  for (let idx of array.keys()) {
    array[idx] = appendString + array[idx];
  }
  return array;
}
