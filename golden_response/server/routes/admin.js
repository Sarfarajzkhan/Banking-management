const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);
router.use((req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
});

router.get('/users', (req, res) => {
  const users = db.prepare('SELECT id, name, email, phone, role, created_at FROM users').all();
  res.json(users);
});

router.get('/accounts', (req, res) => {
  const accounts = db.prepare(`
    SELECT accounts.*, users.name as user_name 
    FROM accounts 
    JOIN users ON accounts.user_id = users.id
  `).all();
  res.json(accounts);
});

router.delete('/users/:id', (req, res) => {
  if (parseInt(req.params.id) === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete yourself' });
  }
  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
