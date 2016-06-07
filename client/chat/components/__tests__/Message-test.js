import React from 'react'
import { shallow, render } from 'enzyme'

jest.disableAutomock()

const Message = require('../Message').default

function createMessage(text) {
  return {
    user: {},
    text
  }
}

describe('Message', () => {
  it('should render', () => {
    const message = createMessage()
    expect(shallow(<Message message={message} />).is('.message')).toBe(true)
  })

  it('should render text message', () => {
    const message = createMessage('foo text')
    const wrapper = shallow(<Message message={message} />)
    expect(wrapper.find('.message-text').length).toBe(1)
  })

  it('should render data message', () => {
    const message = createMessage()
    message.data = 'asdfasdfsaf'

    const wrapper = render(<Message message={message} />)
    expect(wrapper.find('.message-image').length).toBe(1)
  })

  it('should linkify text', () => {
    const message = createMessage('foo http://www.google.com bar')
    const wrapper = render(<Message message={message} />)
    expect(wrapper.find('a').length).toBe(1)
  })

  it('should emojify text', () => {
    const message = createMessage(':poop:')
    const wrapper = render(<Message message={message} />)
    expect(wrapper.find('img').length).toBe(1)
  })
})
