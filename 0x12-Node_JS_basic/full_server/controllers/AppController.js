class AppController {
  static getHomepage(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello Holberton School!');
  }
}
