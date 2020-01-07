const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

require('./socket')(io)

server.listen(9000, () => console.log('running 9000'))