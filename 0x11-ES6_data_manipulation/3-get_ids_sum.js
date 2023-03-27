export default function getStudentIdsSum(Students) {
  const ids = Students.map((Students) => Students.id);
  const sum = ids.reduce((acc, curr) => acc + curr, 0);
  return sum;
}
