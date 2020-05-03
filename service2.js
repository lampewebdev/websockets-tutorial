const chalk = require('chalk')
const server = require('http').createServer();
const ioServer = require('socket.io')(server, {
    path: '/',
    serveClient: false,
});
const ioClient = require('socket.io-client');

const log = (msg) => console.log(chalk.bold.cyan.bgBlack('Service2:'), chalk.white.bgBlack(`${msg}`))

// Server Code
ioServer.on('connection', client => {
    log('someone connected');
    client.on('sayHello', data => {
        log(`event: sayHello, data: ${data}`)
        client.emit('halloToYouTo', "hello from http://localhost:5000")
    });
    client.on('disconnect', () => {
        log('event: disconnect, client disconnected')
    });
});

// Client Code
const clientAddr = 'http://localhost:4000';
const socket = ioClient(clientAddr, {
    path: '/'
});
socket.on('connect', function (data) {
    log(`connected to ${clientAddr}`);

    socket.emit('sayHello', 'Hello World from client');

    socket.on('halloToYouTo', data => {
        log(`event: helloToYouTo, ${data}`)
    });
});

server.listen(5000);
log('started server on port 5000')
