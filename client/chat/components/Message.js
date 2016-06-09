import moment from 'moment'
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import emojify from '../helpers/emojify'
import markdownify from '../helpers/markdownify'

class ImagePreview extends Component {
  componentDidMount() {
    const node = findDOMNode(this)
    if(!node) return

    const img = node.querySelector('img')

    img.onload = () => {
      this.props.onHeightChange()
    }
  }

  render() {
    if(!this.props.text) return null
    const matches = this.props.text.match(/(http|HTTP|https|HTTPS):\/\/.*\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)/g)

    if(!matches || !matches.length) return null
    const url = matches[0]

    return(
      <div className="image-preview">
        <a href={url} target="blank">
          <img src={url} />
        </a>
      </div>
    )
  }
}


class Message extends Component {
  componentDidMount() {
    const anchors = findDOMNode(this).querySelectorAll('a')

    Object.keys(anchors).forEach(key => {
      anchors[key].setAttribute('target', 'blank')
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
