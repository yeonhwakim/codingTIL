var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const pg = new require('pg').Pool({
  user: 'yeonhwa',
  host: 'jummer.cupxpirjrt9s.ap-northeast-2.rds.amazonaws.com',
  database: 'jummer',
  password: 'qet135!#%',
  port: 5432,
})

const list = io.of('/list');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/aRoom.html');
});

app.get('/list', function(req, res){
  res.sendFile(__dirname + '/aRoom.html');
});

list.on('connection', function(socket){
  socket.emit('connected', 'ok')
  socket.on('getList', function(data){
    socket.join(data.room, () => {
      pg.query(('SELECT * FROM voteroom WHERE room=$1'),[data.room],(err, result)=>{
        if (err) console.log(err)
        list.to(data.room).emit('setList', result.rows);
      })
    })
  });
  socket.on('updataList', (data) => {
    console.log(data)
    list.to(data.room).emit('updateList', data);
    pg.query(('update voteroom SET counter=$1 WHERE room=$2 AND id=$3'),[data.count, data.room, data.id],(err)=>{
      if (err) console.log(err)
    })
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});