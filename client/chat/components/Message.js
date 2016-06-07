import React, { Component } from 'react'
import emojify from '../helpers/emojify'
import markdownify from '../helpers/markdownify'

class Message extends Component {
  renderDataMessage() {
    return(
      <img className="message-image" src={this.props.message.data} />
    )
  }

  renderTextMessage() {
    return(
      <span
        className="message-text"
        dangerouslySetInnerHTML={{
          __html: emojify(markdownify(this.props.message.text))
        }} />
    )
  }

  renderMessageContent() {
    if(this.props.message.data) {
      return this.renderDataMessage()
    } else {
      return this.renderTextMessage()
    }
  }

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
        <div className="message-content">
          {this.renderMessageContent()}
        </div>
      </div>
    );
  }
}

// todo: add PropTypes

export default Message
