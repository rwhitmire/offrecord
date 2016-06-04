const messageStore = require('./stores/message')

module.exports = function(io) {
  io.on('connection', socket => {
    console.log('a user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('join_room', data => {
      socket.join(data.roomId)
      console.log(`${socket.id} --> ${data.username} has joined room ${data.roomId}`)
    })

    socket.on('message', message => {
      io.to(message.roomId).emit('message', message)
      messageStore.create(message)
    })
  })
}
