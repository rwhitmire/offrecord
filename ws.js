const messageStore = require('./stores/message')
const roomUsersStore = require('./stores/roomUsers')

module.exports = function(io) {
  io.on('connection', socket => {
    console.log('a user connected')

    socket.on('disconnect', () => {
      if(!socket.user) return;
      roomUsersStore.disconnectUser(socket.roomId, socket.user.id, socket.id)

      io.to(socket.roomId).emit('leave room', {
        user: socket.user,
        roomUsers: roomUsersStore.get(socket.roomId)
      })
    })

    socket.on('join room', data => {
      socket.user = data.user
      socket.roomId = data.roomId
      socket.join(data.roomId)
      console.log(`${socket.id} --> ${data.user.username} (${data.user.id}) has joined room ${data.roomId}`)
      roomUsersStore.connectUser(data.roomId, data.user, socket.id)

      io.to(socket.roomId).emit('join room', {
        user: socket.user,
        roomUsers: roomUsersStore.get(data.roomId)
      })
    })

    socket.on('message', message => {
      message.user = socket.user
      message.roomId = socket.roomId
      io.to(socket.roomId).emit('message', message)
      messageStore.create(message)
    })

    socket.on('start typing', () => {
      io.to(socket.roomId).emit('start typing', {
        user: socket.user
      })
    })

    socket.on('end typing', () => {
      io.to(socket.roomId).emit('end typing', {
        user: socket.user
      })
    })
  })
}
