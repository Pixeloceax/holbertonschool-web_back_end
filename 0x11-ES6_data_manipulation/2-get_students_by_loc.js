export default function getStudentsByLocation(Students, City) {
  return Students.filter((student) => student.location === City);
}
