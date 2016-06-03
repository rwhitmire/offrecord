var express = require('express');
var shortid = require('shortid');
var router = express.Router();

router.post('/new', (req, res, next) => {
  const id = shortid()
  res.redirect('/rooms/' + id);
});

router.get('/:id/login', (req, res, next) => {
  res.render('login');
});

router.post('/:id/login', (req, res, next) => {
  res.cookie('username', req.body.username);
  res.redirect(`/rooms/${req.params.id}`);
});

router.get('/:id', (req, res, next) => {
  if(!req.cookies.username) {
    return res.redirect(`/rooms/${req.params.id}/login`)
  }

  res.render('room', {
    messages: JSON.stringify([
      {text: 'hi', timestamp: Date.now()},
      {text: 'bye', timestamp: Date.now()},
      {text: 'ok', timestamp: Date.now()}
    ]),
    username: req.cookies.username,
    roomId: req.params.id
  });
});

module.exports = router;
