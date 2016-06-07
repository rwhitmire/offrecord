import React from 'react';
import { shallow, render } from 'enzyme';

jest.unmock('../Message')

const Message = require('../Message').default

describe('Message', () => {
  it('should render', () => {
    const message = {
      user: {}
    }

    expect(shallow(<Message message={message} />).is('.message')).toBe(true);
  })

  it('should render text message', () => {
    const message = {
      user: {},
      text: 'foo text'
    }

    const wrapper = shallow(<Message message={message} />)
    expect(wrapper.find('.message-text').length).toBe(1)
  })

  it('should render data message', () => {
    const message = {
      user: {},
      data: 's0d9fj0sdjf',
      timestamp: Date.now()
    }

    const wrapper = render(<Message message={message} />)
    expect(wrapper.find('.message-image').length).toBe(1)
  })
})
