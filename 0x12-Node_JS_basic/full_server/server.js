const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use('/', routes);

app.listen(1245, () => {
  console.log('Server listening on port 1245');
});
