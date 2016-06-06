import React, { Component } from 'react'

class MessageForm extends Component {
  onKeyPress(e) {
    if(e.which === 13 && !e.shiftKey) {
      e.preventDefault()
      this.props.onSendMessage(this.refs.text.value)
      this.refs.text.value = ''
      this.refs.text.focus()
    }
  }

  render() {
    return (
      <div className="message-form">
        <div className="message-form-inner">
          <textarea
            ref="text"
            rows="1"
            onKeyPress={this.onKeyPress.bind(this)} />
        </div>
      </div>
    )
  }
}

export default MessageForm
