<p align="center">
  <img src="https://img.shields.io/badge/Banking-Management%20System-0A2647?style=for-the-badge&logo=bank&logoColor=white" alt="Banking Management System" />
</p>

<h1 align="center">🏦 Personal / Retail Banking Management System</h1>

<p align="center">
  A professional, secure, full-stack banking management application that provides retail banking customers with a seamless and modern experience to manage their finances.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#-api-endpoints)
- [Authentication & Security](#-authentication--security)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏦 Overview

The **Personal/Retail Banking Management System** is a full-stack web application built to simulate a real-world banking experience. It provides customers with a modern, responsive dashboard to manage all their finances — including accounts, balances, transactions, and personal profiles — with enterprise-grade security.

### 🎯 Main Objective

- ✅ Ensure **secure logins and sessions** using JWT-based authentication
- ✅ Full **CRUD operations** for account management (Create, View, Update, Delete)
- ✅ **Real-time balance** and **transaction history** tracking
- ✅ **Role-Based Access Control** (Customer / Admin)
- ✅ **Data protection** through secure storage, validation, and vulnerability prevention
- ✅ Professional, minimalistic **banking-grade UI/UX**

---

## ✨ Key Features

### 👤 Customer Features
| Feature | Description |
|---|---|
| **User Registration & Login** | Secure signup/login with form validation and JWT authentication |
| **Main Dashboard** | Account summary, total balance overview, and recent activity at a glance |
| **Account Management** | Create savings/current accounts, view details, update info, close accounts |
| **Multiple Accounts** | Users can own and manage multiple bank accounts simultaneously |
| **Transaction History** | Full transaction listing with date, type, remarks, and amount |
| **Real-Time Balances** | Live balance display on both dashboard and individual account pages |
| **Profile Management** | Update personal information (name, email, phone) |
| **Security Settings** | Change password with current password verification |

### 🔑 Admin Features
| Feature | Description |
|---|---|
| **Admin Dashboard** | Comprehensive view of all users and system-wide account management |
| **User Management** | View, manage, and oversee all customer accounts |
| **Role-Based Access** | Admin-only routes protected by middleware authorization |

### 🎨 UI/UX Highlights
- 📱 **Fully Responsive** — Optimized for phone, tablet, and desktop
- ♿ **Accessible** — Semantic HTML and keyboard-navigable components
- 🎯 **Banking Aesthetic** — Professional, minimalistic, and clean design
- ⚡ **Fast Performance** — Lightweight frontend with optimized API calls
- 🔔 **User Feedback** — Success/error notifications after every action

---

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 | Component-based UI framework |
| **Styling** | Tailwind CSS 4 | Utility-first responsive styling |
| **Routing** | React Router DOM 7 | Client-side navigation & protected routes |
| **Backend** | Node.js + Express 5 | RESTful API server |
| **Database** | SQLite (better-sqlite3) | Lightweight, persistent data storage |
| **Authentication** | JWT (jsonwebtoken) | Token-based stateless authentication |
| **Encryption** | bcryptjs | Password hashing & verification |
| **Build Tool** | Vite 8 | Fast frontend build & dev server |
| **Linting** | ESLint | Code quality & consistency |

---

## 📁 Project Structure

```
Banking-management/
├── public/                     # Static public assets
├── server/                     # ── Backend (Express API) ──
│   ├── index.js                # Express server entry point
│   ├── db.js                   # SQLite database setup & schema
│   ├── package.json            # CommonJS config for server
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   └── routes/
│       ├── auth.js             # POST /register, POST /login
│       ├── accounts.js         # CRUD operations for accounts
│       ├── transactions.js     # Transaction history & creation
│       ├── profile.js          # User profile management
│       ├── security.js         # Password change endpoint
│       └── admin.js            # Admin-only user management
├── src/                        # ── Frontend (React) ──
│   ├── main.jsx                # React app entry point
│   ├── App.jsx                 # Main routing & layout
│   ├── App.css                 # Global styles
│   ├── index.css               # Tailwind CSS imports
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication state management
│   ├── components/
│   │   └── Navbar.jsx          # Navigation bar component
│   └── pages/
│       ├── Login.jsx           # Login page with validation
│       ├── Signup.jsx          # Registration page with validation
│       ├── Dashboard.jsx       # Main dashboard with account summary
│       ├── Accounts.jsx        # Account management (CRUD)
│       ├── Transactions.jsx    # Transaction history & new transfers
│       ├── Profile.jsx         # Personal profile editing
│       ├── Security.jsx        # Password change page
│       └── AdminPanel.jsx      # Admin dashboard (admin-only)
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration with API proxy
├── eslint.config.js            # ESLint configuration
├── package.json                # Project dependencies & scripts
├── package-lock.json           # Dependency lock file
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation (this file)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **npm** (v9 or higher) — comes with Node.js
- **Git** — [Download](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sarfarajzkhan/Banking-management.git
   cd Banking-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   > This installs both frontend and backend dependencies from the root `package.json`.

### Environment Variables

Create a `.env` file in the root directory for configuration:

```env
# ── .env.example ──

# Server Configuration
PORT=3001

# JWT Secret Key (change this in production!)
JWT_SECRET=your_super_secret_jwt_key_here

# Token Expiration
JWT_EXPIRES_IN=24h

# Database (SQLite - auto-created)
DB_PATH=./server/securebank.db
```

> ⚠️ **Important:** Never commit your `.env` file to version control. The `.gitignore` is already configured to exclude it.

### Running the Application

You need to start **both** the backend and frontend servers:

**Terminal 1 — Start the Backend API Server:**
```bash
node server/index.js
```
> Backend runs on `http://localhost:3001`

**Terminal 2 — Start the Frontend Dev Server:**
```bash
npm run dev
```
> Frontend runs on `http://localhost:5173`

**Open the app:** Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Accounts

The database comes pre-seeded with test accounts:

| Role | Email | Password |
|---|---|---|
| **Customer** | `sarfaraj@example.com` | `password123` |
| **Admin** | `admin@securebank.com` | `admin123` |

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | Login & receive JWT token | ❌ No |

### Account Management
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/accounts` | Get all accounts of logged-in user | ✅ Yes |
| `GET` | `/api/accounts/:id` | Get details of a specific account | ✅ Yes |
| `POST` | `/api/accounts` | Create a new account (savings/current) | ✅ Yes |
| `PUT` | `/api/accounts/:id` | Update account details | ✅ Yes |
| `DELETE` | `/api/accounts/:id` | Close/deactivate an account | ✅ Yes |

### Transactions
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/transactions` | Get all transactions for user | ✅ Yes |
| `GET` | `/api/transactions/:accountId` | Get transactions for specific account | ✅ Yes |
| `POST` | `/api/transactions` | Create a new transaction | ✅ Yes |

### Profile & Security
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/profile` | Get user profile details | ✅ Yes |
| `PUT` | `/api/profile` | Update user profile information | ✅ Yes |
| `PUT` | `/api/security/password` | Change user password | ✅ Yes |

### Admin (Admin Role Only)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/admin/users` | Get all users in the system | ✅ Admin |
| `DELETE` | `/api/admin/users/:id` | Delete/deactivate a user | ✅ Admin |

### API Response Format

All API responses follow a structured JSON format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

---

## 🔐 Authentication & Security

| Security Feature | Implementation |
|---|---|
| **Token-Based Auth** | JWT tokens with configurable expiration |
| **Password Encryption** | bcryptjs with salted hashing |
| **Protected Routes** | Auth middleware validates JWT on every protected endpoint |
| **Role-Based Access Control** | Customer and Admin roles with route-level enforcement |
| **Input Sanitization** | All inputs validated to prevent XSS and injection attacks |
| **Form Validation** | Email format, phone number, required fields validated on both client & server |
| **Secure Data Handling** | Passwords and tokens never returned in API responses |
| **CORS Protection** | Configured CORS middleware for cross-origin request control |
| **Environment Variables** | Sensitive credentials stored via dotenv configuration |

### Authentication Flow

```
┌──────────┐     POST /auth/login      ┌──────────┐
│          │ ──────────────────────────▶│          │
│  Client  │     { email, password }   │  Server  │
│ (React)  │ ◀──────────────────────── │(Express) │
│          │     { token, user }       │          │
└──────────┘                           └──────────┘
      │                                      │
      │  Subsequent requests with             │
      │  Authorization: Bearer <token>        │
      │ ────────────────────────────────────▶ │
      │                                      │
      │  JWT verified by auth middleware      │
      │ ◀──────────────────────────────────── │
      │  Protected data returned              │
```

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  phone       TEXT,
  password    TEXT NOT NULL,          -- bcrypt hashed
  role        TEXT DEFAULT 'customer', -- 'customer' | 'admin'
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Accounts Table
```sql
CREATE TABLE accounts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL,
  type        TEXT NOT NULL,           -- 'savings' | 'current'
  balance     REAL DEFAULT 0,
  status      TEXT DEFAULT 'active',   -- 'active' | 'inactive' | 'closed'
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  account_id  INTEGER NOT NULL,
  type        TEXT NOT NULL,           -- 'deposit' | 'withdrawal' | 'transfer'
  amount      REAL NOT NULL,
  description TEXT,
  date        DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);
```

---

## 🖼 Screenshots

| Page | Description |
|---|---|
| **Login Page** | Secure login with email/password validation |
| **Registration** | New user signup with comprehensive form validation |
| **Dashboard** | Overview of balances, account count, and recent activity |
| **Accounts** | Manage multiple savings/current accounts |
| **Transactions** | Full transaction history with filtering |
| **Profile** | Edit personal information |
| **Admin Panel** | System-wide user and account management |

---

## 🌐 Deployment

### Deploy Frontend on Vercel

1. **Build the frontend:**
   ```bash
   npm run build
   ```
2. **Push to GitHub** (already done).
3. **Import on Vercel:**
   - Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub.
   - Set the **Build Command** to `npm run build`.
   - Set the **Output Directory** to `dist`.
   - Add environment variables as needed.

### Deploy Backend on Render / Railway

1. **Render:**
   - Create a new **Web Service** on [render.com](https://render.com).
   - Connect your GitHub repository.
   - Set **Build Command**: `npm install`
   - Set **Start Command**: `node server/index.js`
   - Add environment variables (`JWT_SECRET`, `PORT`, etc.).

2. **Railway:**
   - Import your GitHub repo on [railway.app](https://railway.app).
   - Set the **Start Command**: `node server/index.js`
   - Configure environment variables in the dashboard.

> **Note:** For production, consider migrating from SQLite to **PostgreSQL** (supported by Render/Railway) for better concurrency and scalability.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request

### Coding Standards
- Follow ESLint configuration for code consistency
- Write meaningful commit messages
- Keep components modular and reusable
- Add comments for complex logic

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Sarfarajzkhan">Sarfarajzkhan</a>
</p>

<p align="center">
  <a href="https://github.com/Sarfarajzkhan/Banking-management">⭐ Star this repo if you found it helpful!</a>
</p>
