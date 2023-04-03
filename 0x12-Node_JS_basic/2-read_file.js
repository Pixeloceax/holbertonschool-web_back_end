const fs = require('fs');

function countStudents(CsvFile) {
  try {
    const data = fs.readFileSync(CsvFile, 'utf8');
    const lines = data.trim().split('\n');
    const studentsByField = {};
    for (let i = 1; i < lines.length; i += 1) {
      const [name, , , field] = lines[i].split(',');
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        studentsByField[field].push(name);
      } else {
        studentsByField[field] = [name];
      }
    }
    console.log(`Number of students: ${lines.length - 1}`);
    for (const field in studentsByField) {
      if (Object.prototype.hasOwnProperty.call(studentsByField, field)) {
        const students = studentsByField[field];
        console.log(
          `Number of students in ${field}: ${
            students.length
          }. List: ${students.join(', ')}`,
        );
      }
    }
  } catch (err) {
    throw new Error(`Cannot load the database: ${err}`);
  }
}

module.exports = countStudents;
