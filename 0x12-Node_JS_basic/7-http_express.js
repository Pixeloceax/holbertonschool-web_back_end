const express = require('express');
const app = express();

const countStudents = require('./3-read_file_async');

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.send('This is the list of our students');
  try {
    const data = await countStudents('database.csv');
    res.end(data);
  } catch (err) {
    res.end('Cannot load the database');
  }
});

app.listen(1245, () => {
  console.log('Server running at http://localhost:1245/');
});
