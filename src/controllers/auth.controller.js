const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');


exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, error: 'Missing required fields: email, password, and role are all required.' });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash, role } });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ success: false, error: 'User with this email already exists.' });
    }
    console.error('Registration Error:', err);
    res.status(500).json({ success: false, error: 'User registration failed due to an internal server error.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    res.json({ success: true, data: { token: generateToken({ id: user.id, role: user.role }) } });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};
