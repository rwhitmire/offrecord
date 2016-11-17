import moment from 'moment'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import emojify from '../helpers/emojify'
import markdownify from '../helpers/markdownify'
import ImagePreview from './ImagePreview'

class Message extends Component {
  componentDidMount() {
    const anchors = findDOMNode(this).querySelectorAll('a')

    Object.keys(anchors).forEach(key => {
      anchors[key].setAttribute('target', '_blank')
      anchors[key].setAttribute('rel', 'noopener noreferrer')
    })
  }

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
            {moment(new Date(message.timestamp)).format('h:mm a')}
          </span>
        </div>
        <div className="message-content">
          {this.renderMessageContent()}
          <ImagePreview
            text={message.text}
            onHeightChange={this.props.onHeightChange} />
        </div>
      </div>
    );
  }
}

// todo: add PropTypes

export default Message
