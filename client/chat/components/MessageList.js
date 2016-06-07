import React, { Component } from 'react'
import Message from './Message'

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

// todo: add PropTypes

export default MessageList
