var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var compression = require('compression')
var app = express()

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

// enforce https in production
if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
    if(!req.secure) {
      var secureUrl = "https://" + req.headers['host'] + req.url
      res.writeHead(301, { "Location":  secureUrl })
      res.end()
    }
    next()
  })
}

app.use('/', require('./routes/index'))
app.use('/rooms', require('./routes/rooms'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


const worker = require('./worker')
worker.run()


module.exports = app
