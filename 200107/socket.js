module.exports = (io) => {
  const test = io.of('/test')
  test.on('connection', (socket) => {
    socket.emit('send', 'ok')
  })
}