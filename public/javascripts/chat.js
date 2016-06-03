(function() {
  'use strict'

  const { messages, username, roomId } = window.payload
  const socket = io()

  socket.emit('join_room', roomId)

  socket.on('message', message => {
    messages.push(message)
    m.redraw()
  })

  function sendMessage(text) {
    socket.emit('message', {
      text,
      username,
      roomId,
      timestamp: Date.now()
    })
  }

  const Message = {
    controller: function(params) {
      this.message = params.message
    },

    view: function(ctrl) {
      return m('div', [
        m('div', new Date(ctrl.message.timestamp).toLocaleTimeString()),
        m('div', ctrl.message.username),
        m('div', ctrl.message.text)
      ])
    }
  }

  const MessageList = {
    view: function() {
      return m('div', messages.map(message => {
        return m(Message, {message})
      }))
    }
  }

  const MessageForm = {
    controller: function() {
      this.onsubmit = e => {
        e.preventDefault()

        if(e.target.message.value) {
          sendMessage(e.target.message.value)
          e.target.message.value = ''
        }
      }
    },

    view: function(ctrl) {
      return m('div', [
        m('form', {onsubmit: ctrl.onsubmit}, [
          m('textarea[name=message]'),
          m('div', [
            m('button', 'send')
          ])
        ])
      ])
    }
  }

  const Chat = {
    view: function() {
      return m('div', [
        MessageList,
        MessageForm
      ])
    }
  }

  m.mount(document.getElementById('chat'), Chat)

}())
