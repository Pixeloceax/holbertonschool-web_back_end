export default function hasArrayValues(set, array) {
  return array.every((value) => set.has(value));
}
