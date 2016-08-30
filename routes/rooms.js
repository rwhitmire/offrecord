var express = require('express')
var shortid = require('shortid')
var atob = require('atob')
var btoa = require('btoa')
var messageStore = require('../stores/message')
var roomUsersStore = require('../stores/roomUsers')
var router = express.Router()

router.post('/new', (req, res, next) => {
  const id = shortid()
  res.redirect('/rooms/' + id)
})

router.get('/:id/login', (req, res, next) => {
  res.render('login')
})

router.post('/:id/login', (req, res, next) => {
  const session = {
    id: shortid(),
    username: req.body.username
  }

  const encodedSession = btoa(JSON.stringify(session))

  res.cookie('session', encodedSession)
  res.redirect(`/rooms/${req.params.id}`)
})

router.get('/:id', (req, res, next) => {
  const roomId = req.params.id;

  if(!req.cookies.session) {
    return res.redirect(`/rooms/${roomId}/login`)
  }

  res.render('room', {
    roomId
  })
})

router.get('/state/:id', (req, res, next) => {
  const roomId = req.params.id
  const user = JSON.parse(atob(req.cookies.session))
  const roomUsers = roomUsersStore.get(roomId)
  const messages = messageStore.getAllByRoomId(roomId)

  res.json({
    messages,
    user,
    roomId,
    roomUsers
  })
})

module.exports = router
