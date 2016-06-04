(function() {
  'use strict'

  const { messages, username, roomId } = window.payload
  const socket = io()

  socket.emit('join_room', { roomId, username })

  socket.on('message', message => {
    conditionalScrollToBottom(() => {
      messages.push(message)
      m.redraw()
    })
  })

  function sendMessage(text) {
    socket.emit('message', {
      text,
      username,
      roomId,
      timestamp: Date.now()
    })
  }

  /**
   * if the user has scrolled up, don't force
   * the scrollbar back to the bottom
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
          m('span.message-username', ctrl.message.username),
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
    view: function() {
      return m('.online-users', [
        m('ul', [
          m('li', [
            m('span.status.online'),
            m('span.username', 'ryanw51@gmail.com')
          ]),
          m('li', [
            m('span.status.online'),
            m('span.username', 'ryanw51@gmail.com')
          ]),
          m('li', [
            m('span.status.online'),
            m('span.username', 'ryanw51@gmail.com')
          ])
        ])
      ])
    }
  }

  const Chat = {
    view: function() {
      return m('.chat', [
        // OnlineUsers,
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
