import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { debounce, defer } from 'lodash'
import Message from './Message'

class MessageList extends Component {
  componentDidMount() {
    const node = findDOMNode(this)

    this.atBottom = this.isScrolledToBottom()

    const trackScrollPosition = () => {
      this.atBottom = this.isScrolledToBottom()
    }

    node.onresize = debounce(trackScrollPosition, 100)
    node.onscroll = debounce(trackScrollPosition, 100)

    // todo: should unbind this event when the component
    // unmounts. Not really an issue unless we remove this
    // component from the DOM at some point.
    window.onresize = () => {
      if(this.atBottom) this.scrollToBottom()
    }

    this.scrollToBottom()

    // Excuse the hack, it fixes a bug in chrome.
    // possibly related to this: https://bugs.chromium.org/p/chromium/issues/detail?id=34224
    setTimeout(() => {
      this.scrollToBottom()
    }, 100)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.messages.length !== this.props.messages.length){
      this.conditionallyScrollToBottom()
    }
  }

  conditionallyScrollToBottom() {
    if(this.atBottom) this.scrollToBottom()
  }

  isScrolledToBottom() {
    const node = findDOMNode(this)
    return node.offsetHeight + node.scrollTop >= node.scrollHeight;
  }

  scrollToBottom() {
    const node = findDOMNode(this)
    node.scrollTop = node.scrollHeight + 1000
  }

  renderMessage(message) {
    return(
      <Message
        key={message.timestamp}
        message={message}
        onHeightChange={this.conditionallyScrollToBottom.bind(this)} />
    )
  }

  render() {
    return (
      <div className="message-list">
        {this.props.messages.map(this.renderMessage.bind(this))}
      </div>
    );
  }
}

// todo: add PropTypes

export default MessageList
