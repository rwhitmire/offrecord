var express = require('express')
var shortid = require('shortid')
var messageStore = require('../stores/message')
var router = express.Router()

router.post('/new', (req, res, next) => {
  const id = shortid()
  res.redirect('/rooms/' + id)
})

router.get('/:id/login', (req, res, next) => {
  res.render('login')
})

router.post('/:id/login', (req, res, next) => {
  res.cookie('username', req.body.username)
  res.redirect(`/rooms/${req.params.id}`)
})

router.get('/:id', (req, res, next) => {
  if(!req.cookies.username) {
    return res.redirect(`/rooms/${req.params.id}/login`)
  }

  messageStore.getAllByRoomId(req.params.id, messages => {
    res.render('room', {
      messages: JSON.stringify(messages),
      username: req.cookies.username,
      roomId: req.params.id
    })
  })
})

module.exports = router
