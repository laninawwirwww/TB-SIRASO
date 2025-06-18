const express = require('express');
const router = express.Router();

// Rute GET untuk halaman login
router.get('/login', (req, res) => {
  res.render('index', { error: null }); // Render halaman login
});

// Rute POST untuk login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Misalnya, periksa username dan password (contoh sederhana)
  if (username === 'admin' && password === 'password') {
    req.session.user = { username }; // Simpan user di session
    return res.redirect('/home'); // Setelah login, arahkan ke halaman home
  }
  
  res.render('index', { error: 'Username atau password salah' }); // Tampilkan error jika login gagal
});

// Rute GET untuk halaman Register
router.get('/register', (req, res) => {
  res.render('register'); // Menampilkan halaman registrasi
});

// Rute POST untuk registrasi
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Proses registrasi (misalnya simpan ke database)
  
  res.redirect('/login'); // Setelah registrasi, arahkan ke halaman login
});

// Get untuk halaman home
router.get('/home', (req, res) => {
  // Cek apakah user sudah login
  if (!req.session.user) {
    return res.redirect('/users/login'); // Jika belum login, redirect ke halaman login
  }
  
  // Render halaman home jika user sudah login
  res.render('home', { user: req.session.user });
});

// Post untuk halaman home
router.post('/home', (req, res) => {
  // Proses yang ingin dilakukan setelah login
  // Misalnya, simpan data atau tampilkan pesan sukses
  res.redirect('/users/home'); // Redirect ke halaman home
});

module.exports = router;
