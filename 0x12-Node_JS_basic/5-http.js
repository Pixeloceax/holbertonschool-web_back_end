const http = require('http');
const countStudents = require('./3-read_file_async');

const server = http.createServer(async (req, res) => {
  if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n\n');
    try {
      const data = await countStudents('database.csv');
      res.end(data);
    } catch (err) {
      res.end('Cannot load the database');
    }
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});
