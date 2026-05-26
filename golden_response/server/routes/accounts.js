const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.get('/', (req, res) => {
  const accounts = db.prepare('SELECT * FROM accounts WHERE user_id = ?').all(req.user.id);
  res.json(accounts);
});

router.post('/', (req, res) => {
  const { type, balance = 0 } = req.body;
  const accountNumber = 'XXXX-XXXX-' + Math.floor(1000 + Math.random() * 9000);
  
  const stmt = db.prepare('INSERT INTO accounts (user_id, type, account_number, balance) VALUES (?, ?, ?, ?)');
  const info = stmt.run(req.user.id, type, accountNumber, balance);
  
  const account = db.prepare('SELECT * FROM accounts WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(account);
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM accounts WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ success: true });
});

module.exports = router;
