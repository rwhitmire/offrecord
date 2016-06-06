import React, { Component } from 'react'
import linkify from '../helpers/linkify'
import emojione from 'emojione'

class Message extends Component {
  render() {
    const { message } = this.props

    return (
      <div className="message">
        <div className="message-title">
          <span className="message-username">{message.user.username}</span>
          <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
        <pre>
          {linkify(emojione.shortnameToUnicode(message.text))}
        </pre>
      </div>
    );
  }
}

export default Message
