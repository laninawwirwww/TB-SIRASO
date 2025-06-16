const express = require('express');
const router = express.Router();

let users = [{ username: 'admin', password: '123' }]; // user sementara

// Arahkan root ke login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// GET halaman login
router.get('/login', (req, res) => {
  res.render('index', { error: null });
});

// POST login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.redirect('/home');
  } else {
    return res.render('index', { error: 'Invalid username or password' });
  }
});

// GET halaman register
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// POST register
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Cek apakah username sudah dipakai
  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.render('register', { error: 'Username already exists' });
  }

  // Simpan user baru
  users.push({ username, email, password });

  // Arahkan ke login setelah berhasil daftar
  res.redirect('/login');
});

// Halaman home
router.get('/home', (req, res) => {
  res.render('home');
});

module.exports = router;
