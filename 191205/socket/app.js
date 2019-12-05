var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const namespaces = io.of('/namespaces');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/namespaces', function(req, res){
  res.sendFile(__dirname + '/namespaces.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('hi');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

namespaces.on('connection', (socket) => {
  socket.emit('conn', 'okay');
  socket.on('chat' , function(msg){
    namespaces.emit('chat', {user: msg.user, chat: msg.chat});
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});