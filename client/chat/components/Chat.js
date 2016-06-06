import React, { Component } from 'react'
import OnlineUsers from './OnlineUsers'
import MessageList from './MessageList'
import MessageForm from './MessageForm'

let windowFocused = true

window.onfocus = function() {
  windowFocused = true
}

window.onblur = function() {
  windowFocused = false
}

function windowHasFocus() {
  return windowFocused
}

function notify(message) {
  if (Notification.permission === 'granted') {
    var notification = new Notification(message);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        var notification = new Notification(message);
      }
    });
  }
}

class Chat extends Component {
  constructor(props) {
    super(props);

    const { messages, user, roomId, roomUsers } = window.payload

    this.state = {
      messages,
      user,
      roomId,
      roomUsers
    }
  }

  componentDidMount() {
    const socket = this.socket = io()

    socket.emit('join room', {
      roomId: this.state.roomId,
      user: this.state.user
    })

    socket.on('message', message => {
      this.props.onConditionalScrollToBottom(() => {
        this.setState({
          messages: [...this.state.messages, message]
        })
      })

      if(!windowHasFocus()){
        notify(message.text)
      }
    })

    socket.on('join room', data => {
      this.setState({
        roomUsers: data.roomUsers
      })
    })

    socket.on('disconnect', data => {
      this.setState({
        roomUsers: data.roomUsers
      })
    })
  }

  sendMessage(text) {
    this.socket.emit('message', {
      text,
      timestamp: Date.now()
    })
  }

  render() {
    return (
      <div className="chat">
        <OnlineUsers users={this.state.roomUsers} />
        <div className="chat-inner">
          <MessageList messages={this.state.messages} />
          <MessageForm onSendMessage={this.sendMessage.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Chat
