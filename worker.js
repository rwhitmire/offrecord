const store = require('./store');
const messageMap = store.messages;

const INTERVAL = 5000;

const destroyOldMessages = () => {
  console.log('destroying old messages.');

  Object.keys(messageMap).forEach(key => {
    const messageArr = messageMap[key];

    messageArr.forEach(message => {

    });
  });
};

module.exports = {
  run() {
    setInterval(destroyOldMessages, INTERVAL)
  }
};
