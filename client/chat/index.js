import React, { Component } from 'react'
import { render } from 'react-dom'

const socket = io()

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


function sendMessage(text) {
  socket.emit('message', {
    text,
    timestamp: Date.now()
  })
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

class OnlineUsers extends Component {
  renderUser(user) {
    return (
      <li key={user.id}>
        <span className="status online"></span>
        <span className="username">{user.username}</span>
      </li>
    )
  }

  render() {
    const users = Object.keys(this.props.users || {}).map(key => {
      return {
        id: key,
        username: this.props.users[key].username
      }
    })

    return (
      <div className="online-users">
        <ul>
          {users.map(this.renderUser)}
        </ul>
      </div>
    );
  }
}


class Message extends Component {
  render() {
    const { message } = this.props

    return (
      <div className="message">
        <div className="message-title">
          <span className="message-username">{message.user.username}</span>
          <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
        <pre>{message.text}</pre>
      </div>
    );
  }
}


class MessageList extends Component {
  renderMessage(message) {
    return <Message key={message.timestamp} message={message} />
  }

  render() {
    return (
      <div className="message-list">
        {this.props.messages.map(this.renderMessage)}
      </div>
    );
  }
}


class MessageForm extends Component {
  onKeyPress(e) {
    if(e.which === 13 && !e.shiftKey) {
      sendMessage(e.target.value)
      e.target.value = ''
      e.target.focus()
      return false
    }
  }

  render() {
    return (
      <div className="message-form">
        <div className="message-form-inner">
          <textarea ref="text" rows="1" onKeyPress={this.onKeyPress.bind(this)}></textarea>
        </div>
      </div>
    );
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
    socket.emit('join room', {
      roomId: this.state.roomId,
      user: this.state.user
    })

    socket.on('message', message => {
      conditionalScrollToBottom(() => {
        this.setState({
          messages: [...this.state.messages, message]
        })
      })
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

  render() {
    return (
      <div className="chat">
        <OnlineUsers users={this.state.roomUsers} />
        <div className="chat-inner">
          <MessageList messages={this.state.messages} />
          <MessageForm />
        </div>
      </div>
    );
  }
}


render(<Chat />, document.getElementById('chat'))
scrollToBottom()
