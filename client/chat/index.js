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
  window.scrollTo(0, document.body.scrollHeight);
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
