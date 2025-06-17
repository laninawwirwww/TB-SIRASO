const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

// Mengimpor routing
const indexRouter = require('./routes/index'); 
const usersRouter = require('./routes/users'); 

const app = express();

// Port yang akan digunakan oleh server
const port = 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware session
app.use(session({
  secret: 'your_secret_key',  // Ganti dengan kunci yang lebih aman
  resave: false,
  saveUninitialized: true
}));

// Routing untuk halaman utama dan login
app.use('/', indexRouter);  // Menggunakan rute untuk halaman utama
app.use('/users', usersRouter); // Menggunakan rute untuk login dan registrasi

// Error handling
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Menjalankan server di localhost:3000
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

module.exports = app;
