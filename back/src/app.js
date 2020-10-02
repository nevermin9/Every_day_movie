const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const router = require('./routers');
const finalhandler = require('finalhandler')

const server = http.createServer((req, res) => {
    router(req, res, finalhandler(req, res));
});

// server.on('request', (req, res) => {
//     console.log('LISTENER OF EVENT');
// });

server.listen(process.env.PORT);
