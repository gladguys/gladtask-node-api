const app = require('./app');
const http = require('http');

// eslint-disable-next-line no-undef
port = process.env.PORT || 3000;

const server = http.createServer(app);
// eslint-disable-next-line no-undef
server.listen(port);
