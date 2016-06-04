/**
 * STATE STRUCTURE:
 *
 * {
 *   'roomid': {
 *     'userid': {
 *       username: 'bill'
 *       connections: {
 *         'socketid': {}
 *       }
 *     }
 *   }
 * }
 *
 */

const state = {}

module.exports = {
  get(roomid) {
    return state[roomid] || {}
  },

  connectUser(roomid, user, socketid) {
    state[roomid] = state[roomid] || {}
    state[roomid][user.id] = state[roomid][user.id] || {}
    state[roomid][user.id]['username'] = user.username
    state[roomid][user.id]['connections'] = state[roomid][user.id]['connections'] || {}
    state[roomid][user.id]['connections'][socketid] = {}
  },

  disconnectUser(roomid, userid, socketid) {
    const room = state[roomid]
    if(!room) return

    const user = room[userid]
    if(!user) return

    delete user.connections[socketid]

    // remove the user as well if they have no more connections
    if(!Object.keys(user.connections).length){
      delete state[roomid][userid]
    }
  }
}
