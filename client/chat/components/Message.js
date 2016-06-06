import React, { Component } from 'react'
import linkify from '../helpers/linkify'
import emojify from '../helpers/emojify'
import markdownify from '../helpers/markdownify'

class Message extends Component {
  render() {
    const { message } = this.props

    const rawMarkup = function() {
      let html = message.text

      html = markdownify(html)
      html = linkify(html)
      html = emojify(html)

      return { __html: html };
    }

    return (
      <div className="message">
        <div className="message-title">
          <span className="message-username">{message.user.username}</span>
          <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
        </div>
        <div className="message-text">
          <pre dangerouslySetInnerHTML={rawMarkup()} />
        </div>
      </div>
    );
  }
}

export default Message
