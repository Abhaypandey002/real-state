const jwt = require('jsonwebtoken');
const config = require('../config');

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (email !== config.adminEmail || password !== config.adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '8h' });
  return res.json({ token });
};

module.exports = { login };
