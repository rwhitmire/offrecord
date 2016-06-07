import React, { Component } from 'react'
import { render } from 'react-dom'
import Chat from './components/Chat'
import { debounce } from 'lodash'

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
  const shouldScroll = isScrolledToBottom();
  if(callback) callback()
  if(!shouldScroll) return
  scrollToBottom()
}


/**
 * BEGIN SCROLLING LOGIC
 *
 * This bit of code ensures the scroll position remains at the bottom if the
 * scrollbar was at the bottom when the user began resizing the window. We have
 * to keep track of `atBottom` on each resize or scroll event because when
 * the resize event triggers, we may not have enough time to calculate the
 * position before it has already moved. This problem is especially evident
 * when maximizing or restoring the window.
 */
let atBottom = isScrolledToBottom()

const trackScrollPosition = function() {
  atBottom = isScrolledToBottom()
}

window.onresize = debounce(trackScrollPosition, 100)
window.onscroll = debounce(trackScrollPosition, 100)

window.onresize = function() {
  if(atBottom) {
    scrollToBottom()
  }
}
/**
 * END SCROLLING LOGIC
 */


render(
  <Chat onConditionalScrollToBottom={conditionalScrollToBottom} />,
  document.getElementById('chat')
)

scrollToBottom()
