var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let node2Res = require('./responses/node2Res.js');

var app = express();
var server = require('http').Server(app);

const io = require('socket.io')(server);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', (socket) => {
  console.log("Client Connected");
  socket.on('toggle-motor', (data) => {
    node2Res = data;
  });
  socket.on('toggle-manual-control', (data) => {
    node2Res = data;
  });
  socket.on('update-motor-speed', (data) => {
    node2Res = data;
  });
});

// routes
app.get('/', (req, res) => {
	res.render('index', {title: 'WSN'});
});
app.post('/1', (req, res) => {
  io.emit('node1_reading', req.body);
});
app.post('/2', (req, res) => {
  io.emit('node2_reading', req.body);
  res.json(node2Res);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.redirect('/');
});

server.listen(80, "192.168.0.102");

// module.exports = app;
