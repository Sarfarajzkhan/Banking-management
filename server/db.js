const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'securebank.db');
const db = new Database(dbPath, { verbose: console.log });

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    two_factor_enabled INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    account_number TEXT UNIQUE NOT NULL,
    balance REAL DEFAULT 0.0,
    status TEXT DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    device TEXT,
    ip TEXT,
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

// Seed data function
function seedData() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount === 0) {
    const insertUser = db.prepare('INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, ?)');
    const insertAccount = db.prepare('INSERT INTO accounts (user_id, type, account_number, balance) VALUES (?, ?, ?, ?)');
    const insertTx = db.prepare('INSERT INTO transactions (account_id, title, amount, type, date) VALUES (?, ?, ?, ?, ?)');

    // Admin user
    const adminHash = bcrypt.hashSync('admin123', 10);
    const adminRes = insertUser.run('Admin User', 'admin@securebank.com', '+1234567890', adminHash, 'admin');

    // Normal user
    const userHash = bcrypt.hashSync('password123', 10);
    const userRes = insertUser.run('Sarfaraj Khan', 'sarfaraj@example.com', '+91 9876543210', userHash, 'user');

    // Add accounts for user
    const acc1Res = insertAccount.run(userRes.lastInsertRowid, 'Savings Account', 'XXXX-XXXX-2841', 245000);
    const acc2Res = insertAccount.run(userRes.lastInsertRowid, 'Current Account', 'XXXX-XXXX-9032', 89500);

    // Add transactions for user (account 1)
    const today = new Date().toISOString();
    const yest = new Date(Date.now() - 86400000).toISOString();
    const dayBefore = new Date(Date.now() - 172800000).toISOString();

    insertTx.run(acc1Res.lastInsertRowid, 'Salary Credit', 75000, 'Credit', today);
    insertTx.run(acc1Res.lastInsertRowid, 'Amazon Payment', 2500, 'Debit', yest);
    insertTx.run(acc1Res.lastInsertRowid, 'Electricity Bill', 1800, 'Debit', dayBefore);

    console.log('Database seeded with test users, accounts, and transactions.');
  }
}

seedData();

module.exports = db;
