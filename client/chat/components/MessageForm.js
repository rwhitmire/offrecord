import React, { Component } from 'react'
import { debounce } from 'lodash'

class MessageForm extends Component {
  constructor(props) {
    super(props)
    this.typing = false

    function endTyping() {
      this.typing = false
      this.props.onEndTyping()
    }

    this.endTypingAfterInterval = debounce(endTyping, 1000)
  }

  onKeyPress(e) {
    if(this.typing === false) {
      this.typing = true
      this.props.onStartTyping()
    }

    this.endTypingAfterInterval()

    if(e.which === 13 && !e.shiftKey) {
      e.preventDefault()
      if(!this.refs.text.value.trim()) return;
      this.props.onSendMessage(this.refs.text.value)
      this.refs.text.value = ''
      this.refs.text.focus()
    }
  }

  render() {
    return (
      <div className="message-form">
        <textarea
          ref="text"
          rows="1"
          onKeyPress={this.onKeyPress.bind(this)} />
      </div>
    )
  }
}

// todo: add PropTypes

export default MessageForm
