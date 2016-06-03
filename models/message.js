'use strict';

const store = require('../store').messages;

const Message = {};

Message.getAllByRoomId = (id, callback) => {
  callback(store[id] || []);
};

Message.create = message => {
  const messages = store[message.roomId] || [];
  messages.push(message);
  store[message.roomId] = messages;
}

module.exports = Message;
