import React, { Component } from 'react'

class OnlineUsers extends Component {
  renderUser(user) {
    const typing = !!this.props.usersTyping[user.id]

    return (
      <li key={user.id}>
        <span className="status online"></span>
        <span className="username">
          {user.username}
          {typing && ' ...'}
        </span>
      </li>
    )
  }

  render() {
    const users = Object.keys(this.props.users || {}).map(key => {
      return {
        id: key,
        username: this.props.users[key].username
      }
    })

    return (
      <div className="online-users">
        <ul>
          {users.map(this.renderUser.bind(this))}
        </ul>
      </div>
    )
  }
}

// todo: add PropTypes

export default OnlineUsers
