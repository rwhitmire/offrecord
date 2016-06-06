import React, { Component } from 'react'
import emojify from '../helpers/emojify'
import markdownify from '../helpers/markdownify'

class Message extends Component {
  render() {
    const { message } = this.props

    return (
      <div className="message">
        <div className="message-title">
          <span className="message-username">
            {message.user.username}
          </span>
          <span className="message-timestamp">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div
          className="message-text"
          dangerouslySetInnerHTML={{
            __html: emojify(markdownify(message.text))
          }} />
      </div>
    );
  }
}

export default Message
