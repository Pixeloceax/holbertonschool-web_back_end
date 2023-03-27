export default function updateStudentGradeByCity(Students, City, newGrades) {
  const filteredCity = Students.filter((student) => student.location === City);
  const filteredIds = filteredCity.map((student) => student.id);
  const filteredGrades = newGrades.filter((grade) =>
    filteredIds.includes(grade.studentId)
  );
  const finalGrades = filteredCity.map((student) => {
    const grade = filteredGrades.find(
      (grade) => grade.studentId === student.id
    );
    if (grade) {
      student.grade = grade.grade;
    } else {
      student.grade = 'N/A';
    }
    return student;
  });
  return finalGrades;
}
