const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


const { log: print } = console;

io.on('connection', (socket) => {
  socket.emit('items', 'okay');
});

server.listen(3000, () => print('running 3000'));
