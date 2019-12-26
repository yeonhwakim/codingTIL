var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { Pool } = require('pg')
const pool = new Pool({
  user: 'yeonhwa',
  host: 'jummer.cupxpirjrt9s.ap-northeast-2.rds.amazonaws.com',
  database: 'jummer',
  password: 'qet135!#%',
  port: 5432,
})

const room = io.of('/room');


app.get('/room', function(req, res){
  res.sendFile(__dirname + '/room.html');
});

room.on('connection', function(socket){
  socket.emit('conn', 'okay')
  socket.on('join', function(msg){
    socket.join(msg.room === 'Room1'? 'room1':'room2', () => {
      socket.to(msg.room === 'Room1'? 'room1':'room2').emit('joined', msg);
    })
  });
  socket.on('chat', function(msg){
    console.log(msg)
    room.to(msg.room === 'Room1'? 'room1':'room2').emit('chatted', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});