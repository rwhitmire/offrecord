const Message = require('./models/message')

module.exports = function(io) {
  io.on('connection', socket => {
    console.log('a user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('join_room', roomId => {
      socket.join(roomId)
      console.log('user has joined room', roomId)
    })

    socket.on('message', message => {
      io.to(message.roomId).emit('message', message)
      Message.create(message)
    })
  })
}
