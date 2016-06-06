import React, { Component } from 'react'
import { render } from 'react-dom'
import Chat from './components/Chat'

/**
 * is the windows scrolled to the bottom?
 */
function isScrolledToBottom() {
  return (window.innerHeight + window.scrollY) >= document.body.offsetHeight
}

function scrollToBottom() {
  function scroll() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  scroll()
  // mithril might not be done painting
  setTimeout(scroll, 30)
  setTimeout(scroll, 100)
}


/**
 * scroll to the bottom, but only if the scroll position
 * was at the bottom prior to the callback executing
 */
function conditionalScrollToBottom(callback) {
  if(!isScrolledToBottom()) return
  if(callback) callback()
  scrollToBottom()
}

render(
  <Chat onConditionalScrollToBottom={conditionalScrollToBottom} />,
  document.getElementById('chat')
)

scrollToBottom()
