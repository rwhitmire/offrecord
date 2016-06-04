'use strict'

/**
 * STATE STRUCTURE:
 *
 * {
 *   'roomid': [{ ..., text: 'message', ... }]
 * }
 *
 */
const state = {}

module.exports = {
  getState() {
    return state
  },

  getAllByRoomId(id) {
    return state[id] || []
  },

  create(message) {
    const messages = state[message.roomId] || []
    messages.push(message)
    state[message.roomId] = messages
  }
}
