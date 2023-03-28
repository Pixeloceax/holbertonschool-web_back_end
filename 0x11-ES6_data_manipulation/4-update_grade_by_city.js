export default function updateStudentGradeByCity(students, city, newGrades) {
  return students
    .filter((student) => student.location === city)
    .map((student) => {
      const gradeObj = newGrades.find(
        (grade) => grade.studentId === student.id,
      );

      const updateStudent = student;
      if (gradeObj) {
        updateStudent.grade = gradeObj.grade;
      } else {
        updateStudent.grade = 'N/A';
      }

      return updateStudent;
    });
}
