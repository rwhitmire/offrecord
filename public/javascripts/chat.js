(function() {
  'use strict'

  let { messages, user, roomId, roomUsers } = window.payload
  const socket = io()

  console.log('room users:', roomUsers)

  /**
   * join the room immediately
   */
  socket.emit('join room', { roomId, user })


  socket.on('message', message => {
    conditionalScrollToBottom(() => {
      messages.push(message)
      m.redraw()
    })
  })


  socket.on('join room', data => {
    console.log('join room', data.user)
    roomUsers = data.roomUsers
    m.redraw()
  })


  socket.on('disconnect', data => {
    console.log('disconnect', data.user)
    roomUsers = data.roomUsers
    m.redraw()
  })


  function sendMessage(text) {
    socket.emit('message', {
      text,
      timestamp: Date.now()
    })
  }


  /**
   * is the windows scrolled to the bottom?
   */
  function isScrolledToBottom() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight
  }


  function scrollToBottom() {
    function scroll() {
      window.scrollTo(0, document.body.scrollHeight);
    }

    scroll()
    // mithril might not be done painting
    setTimeout(scroll, 30)
    setTimeout(scroll, 100)
  }


  /**
   * scroll to the bottom, but only if the scroll position
   * was at the bottom prior to the callback executing
   */
  function conditionalScrollToBottom(callback) {
    if(!isScrolledToBottom()) return
    if(callback) callback()
    scrollToBottom()
  }


  const Message = {
    controller: function(params) {
      this.message = params.message
    },

    view: function(ctrl) {
      return m('.message', [
        m('div.message-title', [
          m('span.message-username', ctrl.message.user.username),
          m('span.message-timestamp', new Date(ctrl.message.timestamp).toLocaleTimeString())
        ]),
        m('pre', ctrl.message.text)
      ])
    }
  }


  const MessageList = {
    view: function() {
      return m('.message-list', messages.map(message => {
        return m(Message, {message})
      }))
    }
  }


  const MessageForm = {
    controller: function() {
      this.onkeypress = e => {
        if(e.keyCode === 13 && !e.shiftKey) {
          sendMessage(e.target.value)
          e.target.value = ''
          e.target.focus()
          return false
        }
      }
    },

    view: function(ctrl) {
      return m('.message-form', [
        m('.message-form-inner', [
          m('textarea[name=message]', { onkeypress: ctrl.onkeypress })
        ])
      ])
    }
  }


  const OnlineUsers = {
    controller: function() {
      this.getOnlineUsers = function() {
        return Object.keys(roomUsers || {}).map(key => {
          return {
            id: key,
            username: roomUsers[key].username
          }
        })
      }
    },

    view: function(ctrl) {
      return m('.online-users', [
        m('ul', ctrl.getOnlineUsers().map(user => {
          return m('li', [
            m('span.status.online'),
            m('span.username', user.username)
          ])
        }))
      ])
    }
  }


  const Chat = {
    view: function() {
      return m('.chat', [
        OnlineUsers,
        m('.chat-inner', [
          MessageList,
          MessageForm
        ])
      ])
    }
  }


  m.mount(document.getElementById('chat'), Chat)
  scrollToBottom()

}())
