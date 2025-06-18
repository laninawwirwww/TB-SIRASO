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
  secret: 'ihsan',  // Ganti dengan kunci yang lebih aman
  resave: false,
  saveUninitialized: true
}));

// Routing untuk halaman utama dan login
app.use('/', indexRouter);  // Menggunakan rute untuk halaman utama
app.use('/users', usersRouter); // Menggunakan rute untuk login dan registrasi

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Menyimpan pengguna baru ke database menggunakan Prisma
    const newUser = await prisma.createUser({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Setelah register berhasil, alihkan ke halaman login
    res.redirect('/users/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal registrasi, coba lagi.' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Mencari pengguna berdasarkan email
    const user = await prisma.user({ email });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(400).json({ error: 'User tidak ditemukan' });
    }

    // Memverifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Password salah' });
    }

    // Mengatur session setelah login berhasil
    req.session.userId = user.id;

    // Redirect ke halaman home setelah login berhasil
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login gagal, coba lagi.' });
  }
});

// Home route
app.get('/home', (req, res) => {
  // Cek apakah user sudah login
  if (!req.session.userId) {
    return res.redirect('/users/login'); // Jika belum login, alihkan ke halaman login
  }

  // Menampilkan halaman home jika user sudah login
  res.render('home', { userId: req.session.userId });
});

// Halaman login
app.get('/users/login', (req, res) => {
  res.render('login');
});

// Halaman register
app.get('/users/register', (req, res) => {
  res.render('register');
});

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
