window.socket = io('http://localhost:3000', {
  transports: ['websocket'],
});
const { socket } = window;

console.log('socket connect');

socket.on('connect', () => {
  socket.emit('test', 'karen');
  console.log('socket connected');
  socket.emit('test');
});