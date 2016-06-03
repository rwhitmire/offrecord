const Message = require('./models/Message')

module.exports = function(io) {
  io.on('connection', socket => {
    console.log('a user connected');
    socket.join(socket.handshake.query.roomId);
    console.log('user has joined room', socket.handshake.query.roomId);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('message', message => {
      io.to(message.roomId).emit('message', message);
      Message.create(message);
    });
  });
};
