const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.use(authenticateToken);

router.put('/password', (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
  if (!bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(400).json({ error: 'Incorrect current password' });
  }
  
  const newHash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, req.user.id);
  
  res.json({ success: true });
});

router.put('/2fa', (req, res) => {
  const { enabled } = req.body;
  db.prepare('UPDATE users SET two_factor_enabled = ? WHERE id = ?').run(enabled ? 1 : 0, req.user.id);
  res.json({ success: true, two_factor_enabled: enabled ? 1 : 0 });
});

module.exports = router;
