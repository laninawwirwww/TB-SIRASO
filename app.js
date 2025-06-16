var express = require('express');
var path = require('path');
var indexRouter = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// jalanlkan server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});