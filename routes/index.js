const express = require('express');
const router = express.Router();

// Halaman login
router.get('/login', (req, res) => {
  res.render('index', { error: null }); // Pastikan halaman login render dengan benar
});

// Halaman utama setelah login
router.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/users/login'); // Jika belum login, redirect ke login
  }
  res.render('home', { username: req.session.user.username });
});

// Arahkan root ke halaman login
router.get('/', (req, res) => {
  res.redirect('/login'); // Arahkan root ke halaman login
});

// rute untuk halaman register
router.get('/register', (req, res) => {
  res.render('register'); // Menampilkan halaman registrasi
});

module.exports = router;
