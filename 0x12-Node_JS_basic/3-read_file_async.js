const fs = require('fs');

async function countStudents(CsvFile) {
  try {
    const data = await fs.promises.readFile(CsvFile, 'utf8');
    const lines = data.trim().split('\n');
    const studentsByField = {};
    for (let i = 1; i < lines.length; i++) {
      const [name, age, location, field] = lines[i].split(',');
      if (studentsByField[field]) {
        studentsByField[field].push(name);
      } else {
        studentsByField[field] = [name];
      }
    }
    console.log(`Number of students: ${lines.length - 1}`);
    for (const field in studentsByField) {
      const students = studentsByField[field];
      console.log(
        `Number of students in ${field}: ${
          students.length
        }. List: ${students.join(', ')}`,
      );
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
