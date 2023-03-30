import readDatabase from './utils.js';

class StudentsController {
  static getAllStudents(req, res) {
    readDatabase('./database.csv')
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is the list of our students\n');
        res.write(
          'Number of students in CS: ' +
            data.CS.length +
            '. List: ' +
            data.CS.join(', ') +
            '\n'
        );
        res.write(
          'Number of students in SWE: ' +
            data.SWE.length +
            '. List: ' +
            data.SWE.join(', ') +
            '\n'
        );
        res.end();
      })
      .catch((err) => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Cannot load the database');
        res.end();
      });
  }

  static getAllStudentsByMajor(req, res) {
    readDatabase('./database.csv')
      .then((data) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(
          'Number of students in ' +
            req.params.major +
            ': ' +
            data[req.params.major].length +
            '. List: ' +
            data[req.params.major].join(', ') +
            '\n'
        );
        res.end();
      })
      .catch((err) => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Cannot load the database');
        res.end();
      });
  }
}
