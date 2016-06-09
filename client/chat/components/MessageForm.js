import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
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

  componentDidMount() {
    // Resize textarea when the component loads
    // because firefox has weird height behavior.
    this.resizeTextArea()
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

  resizeTextArea() {
    this.refs.text.style.height = `5px`
    this.refs.text.style.height = `${this.refs.text.scrollHeight + 4}px`
    this.props.onTextAreaResize()
  }

  render() {
    return (
      <div className="message-form">
        <textarea
          ref="text"
          rows="1"
          onKeyUp={this.resizeTextArea.bind(this)}
          onInput={this.resizeTextArea.bind(this)}
          onKeyPress={this.onKeyPress.bind(this)} />
      </div>
    )
  }
}

// todo: add PropTypes

export default MessageForm
