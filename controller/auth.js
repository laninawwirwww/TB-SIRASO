const prisma = require('@prisma/client');
const bcrypt = require('bcrypt');
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

const registerUser = async (data) => {
  const { fullname, username, phone, status, alamat, email, password } = data;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        fullname,
        username,
        phone,
        status,
        address: alamat,
        email,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

module.exports = { registerUser };
