const express = require('express');
const router = express.Router();

// Halaman login
router.get('/login', (req, res) => {
  res.render('index', { error: null }); // Pastikan halaman login render dengan benar
});

// Get untuk halaman home
router.get('/home', (req, res) => {
  // Cek apakah user sudah login
  if (!req.session.user) {
    return res.redirect('/users/login'); // Jika belum login, redirect ke halaman login
  }
  
  // Render halaman home jika user sudah login
  res.render('/users/home', { user: req.session.user });
});

// Post untuk halaman home
router.post('/home', (req, res) => {
  // Proses yang ingin dilakukan setelah login
  // Misalnya, simpan data atau tampilkan pesan sukses
  res.redirect('/users/home'); // Redirect ke halaman home
});

// Arahkan root ke halaman login
router.get('/', (req, res) => {
  res.redirect('/users/login'); // Arahkan root ke halaman login
});

// Halaman pencarian
router.get('/pencarian', function(req, res, next) {
  res.render('pencarian');
});


// post setelah register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Cek apakah username sudah ada di database
  prisma.user.findUnique({
    where: { username: username }
  })
  .then(existingUser => {
    if (existingUser) {
      // Jika username sudah ada, beri pesan error
      return res.render('register', { error: 'Username sudah digunakan' });
    }

    // Enkripsi password menggunakan bcrypt
    bcrypt.hash(password, 10)
      .then(hashedPassword => {
        // Menyimpan pengguna baru di database
        prisma.user.create({
          data: {
            username: username,
            password: hashedPassword,  // Simpan password yang sudah terenkripsi
            fullname: fullname,
            phone: phone,
            status: status,
            address: address,
            email: email,
          },
        })
        .then(newUser => {
          console.log('User created:', newUser);

          // Setelah registrasi berhasil, arahkan ke halaman login
          res.redirect('/users/login');
        })
        .catch(error => {
          console.error('Error during user creation:', error);
          res.status(500).send('Internal Server Error');
        });
      })
      .catch(error => {
        console.error('Error during password hashing:', error);
        res.status(500).send('Internal Server Error');
      });
  })
  .catch(error => {
    console.error('Error during username check:', error);
    res.status(500).send('Internal Server Error');
  });
});

// rute untuk halaman register
router.get('/register', (req, res) => {
  res.render('register'); // Menampilkan halaman registrasi
});

module.exports = router;
