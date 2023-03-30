const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const lines = data.split('\n').map((line) => line.trim());
        const result = {};
        lines.forEach((line) => {
          const [firstName, lastName, field] = line.split(',');
          if (!result[field]) {
            result[field] = [];
          }
          result[field].push(firstName);
        });
        resolve(result);
      }
    });
  });
}
