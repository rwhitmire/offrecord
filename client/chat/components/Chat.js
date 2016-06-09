import React, { Component } from 'react'
import io  from 'socket.io-client'
import OnlineUsers from './OnlineUsers'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import { onImagePaste } from '../helpers/clipboard'

let windowHasFocus = true

window.onfocus = function() {
  windowHasFocus = true
}

window.onblur = function() {
  windowHasFocus = false
}

if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
  Notification.requestPermission();
}

function notify(title, body) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/images/logo-64.png',
      body
    });

    notification.onclick = () => {
      window.focus()
    }
  }
}

class Chat extends Component {
  constructor(props) {
    super(props);

    // todo: pass these in via props
    const { messages, user, roomId, roomUsers } = window.payload

    this.state = {
      messages,
      user,
      roomId,
      roomUsers,
      usersTyping: {}
    }
  }

  componentDidMount() {
    const socket = this.socket = io()

    const joinRoom = () => {
      socket.emit('join room', {
        roomId: this.state.roomId,
        user: this.state.user
      })
    }

    joinRoom()

    socket.on('message', message => {
      this.setState({
        messages: [...this.state.messages, message]
      })

      if(!windowHasFocus){
        notify(message.user.username, message.text)
      }
    })

    socket.on('join room', data => {
      this.setState({
        roomUsers: data.roomUsers
      })
    })

    socket.on('leave room', data => {
      this.setState({
        roomUsers: data.roomUsers
      })
    })

    socket.on('start typing', data => {
      this.setState({
        usersTyping: {
          [data.user.id]: data.user
        }
      })
    })

    socket.on('end typing', data => {
      delete this.state.usersTyping[data.user.id]

      this.setState({
        usersTyping: this.state.usersTyping
      })
    })

    socket.on('reconnect', () => {
      joinRoom()
    })

    onImagePaste(data => {
      this.sendImage(data)
    })
  }

  sendImage(data) {
    this.socket.emit('message', {
      data,
      timestamp: Date.now()
    })
  }

  sendMessage(text) {
    this.socket.emit('message', {
      text,
      timestamp: Date.now()
    })
  }

  onStartTyping() {
    this.socket.emit('start typing')
  }

  onEndTyping() {
    this.socket.emit('end typing')
  }

  onTextAreaResize() {
    this.refs.messageList.scrollToBottom()
  }

  render() {
    return (
      <div className="chat">
        <OnlineUsers
          users={this.state.roomUsers}
          usersTyping={this.state.usersTyping} />
        <div className="chat-inner">
          <MessageList
            ref="messageList"
            messages={this.state.messages} />
          <MessageForm
            onSendMessage={this.sendMessage.bind(this)}
            onStartTyping={this.onStartTyping.bind(this)}
            onEndTyping={this.onEndTyping.bind(this)}
            onTextAreaResize={this.onTextAreaResize.bind(this)} />
        </div>
      </div>
    )
  }
}

// todo: add PropTypes

export default Chat
