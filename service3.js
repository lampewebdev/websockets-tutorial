const chalk = require('chalk')
const ioClient = require('socket.io-client');

const log = (msg) => console.log(chalk.bold.magenta.bgBlack('Service3:'), chalk.white.bgBlack(`${msg}`));

// Client Code
const clientAddr = 'http://localhost:5000';
const socket = ioClient(clientAddr, {
    path: '/'
});

socket.on('connect', function (data) {
    log(`connected to ${clientAddr}`);
    socket.emit('sayHello', 'Hello World from client');

    socket.on('halloToYouTo', data => {
        log(`event: halloToYouTo, data: ${data}`);
    });
});
log('started client ready');
