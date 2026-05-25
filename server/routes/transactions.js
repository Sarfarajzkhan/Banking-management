const express = require('express');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.get('/', (req, res) => {
  const accounts = db.prepare('SELECT id FROM accounts WHERE user_id = ?').all(req.user.id);
  const accountIds = accounts.map(a => a.id);
  
  if (accountIds.length === 0) return res.json([]);
  
  const placeholders = accountIds.map(() => '?').join(',');
  const transactions = db.prepare(`SELECT * FROM transactions WHERE account_id IN (${placeholders}) ORDER BY date DESC`).all(...accountIds);
  
  res.json(transactions);
});

router.post('/', (req, res) => {
  const { account_id, title, amount, type } = req.body;
  
  // verify account belongs to user
  const account = db.prepare('SELECT * FROM accounts WHERE id = ? AND user_id = ?').get(account_id, req.user.id);
  if (!account) return res.status(403).json({ error: 'Unauthorized account' });

  // Add transaction
  const stmt = db.prepare('INSERT INTO transactions (account_id, title, amount, type) VALUES (?, ?, ?, ?)');
  const info = stmt.run(account_id, title, amount, type);
  
  // Update balance
  const balanceChange = type === 'Credit' ? amount : -amount;
  db.prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?').run(balanceChange, account_id);
  
  const transaction = db.prepare('SELECT * FROM transactions WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(transaction);
});

module.exports = router;
