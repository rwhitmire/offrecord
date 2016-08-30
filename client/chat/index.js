import React, { Component } from 'react'
import { render } from 'react-dom'
import Chat from './components/Chat'

const opts = {
  credentials: 'include'
}

fetch(`/rooms/state/${window.roomId}`, opts)
  .then(res => {
    return res.json()
  })
  .then(json => {
    render(
      <Chat
        messages={json.messages}
        user={json.user}
        roomId={json.roomId}
        roomUsers={json.roomUsers}/>,
      document.getElementById('chat')
    )
  })
