'use strict'

/**
 * keys are room ids.
 */
const messageMap = {}

const store = {}

store.getAllByRoomId = (id, callback) => {
  callback(messageMap[id] || [])
}

store.create = message => {
  const messages = messageMap[message.roomId] || []
  messages.push(message)
  messageMap[message.roomId] = messages
}

module.exports = store
