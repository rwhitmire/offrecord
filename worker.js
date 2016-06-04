const store = require('./stores/message')
const messageMap = store.getState()

const INTERVAL = 1000 * 60

const destroyOldMessages = () => {
  console.log('destroying old messages.')
  const thirtyMinutesAgo = Date.now() - (1000 * 60 * 30)

  Object.keys(messageMap).forEach(key => {
    messageMap[key] = messageMap[key].filter(message => {
      return message.timestamp > thirtyMinutesAgo
    })
  })
}

module.exports = {
  run() {
    setInterval(destroyOldMessages, INTERVAL)
  }
}
