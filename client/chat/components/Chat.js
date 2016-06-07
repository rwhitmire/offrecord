import React, { Component } from 'react'
import OnlineUsers from './OnlineUsers'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import { onImagePaste } from '../helpers/clipboard'

let windowFocused = true

window.onfocus = function() {
  windowFocused = true
}

window.onblur = function() {
  windowFocused = false
}

if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
  Notification.requestPermission();
}

function windowHasFocus() {
  return windowFocused
}



// if (typeof Notification !== 'undefined') {
//   alert('Please us a modern version of Chrome, Firefox, Opera or Safari.');
//   return;
// }

// Notification.requestPermission(function (permission) {
//   if (permission !== 'granted') return;

//   var notification = new Notification('Here is the title', {
//     icon: 'http://path.to/my/icon.png',
//     body: 'Some body text',
//   });

//   notification.onclick = function () {
//     window.focus();
//   };
// });

function notify(title, body) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: null,
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
        notify(message.user.username, message.text)
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

// todo: add PropTypes

export default Chat
