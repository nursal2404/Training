const http = require('http');
const routes = require('./routes');

const PORT = 9000;

const server = http.createServer((request, response) => {
  routes(request, response);
});

server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});