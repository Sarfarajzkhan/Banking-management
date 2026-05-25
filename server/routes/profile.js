const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.get('/', (req, res) => {
  const user = db.prepare('SELECT id, name, email, phone, role, two_factor_enabled FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

router.put('/', (req, res) => {
  const { name, email, phone } = req.body;
  
  try {
    db.prepare('UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?').run(name, email, phone, req.user.id);
    const updatedUser = db.prepare('SELECT id, name, email, phone, role, two_factor_enabled FROM users WHERE id = ?').get(req.user.id);
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Could not update profile' });
  }
});

module.exports = router;
