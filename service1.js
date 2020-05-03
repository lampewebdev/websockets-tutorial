const chalk = require('chalk');
const server = require('http').createServer();
const io = require('socket.io')(server, {
    path: '/',
    serveClient: false,
});

const log = (msg) => console.log(chalk.bold.green.bgBlack('Service1:'), chalk.white.bgBlack(`${msg}`))

io.on('connection', client => {
    log('someone connected');
    client.on('sayHello', data => {
        log(`event: sayHello, data: ${data}`)
        client.emit('halloToYouTo', 'Hello from http://localhost:4000')
    });
    client.on('disconnect', () => {
        log('client disconnected')
    });
});

server.listen(4000);
log('started server on port 4000')
