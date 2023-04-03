const http = require('http');

const host = 'localhost';
const port = 1245;

const countStudents = require('./3-read_file_async');

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  }

  if (req.url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(await countStudents(process.argv[2]));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
