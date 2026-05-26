# Project Prompt

Act as a senior Full Stack Developer specialized in creating secure applications for finance-based websites.

**Task:** Develop a comprehensive retail banking management software that allows logged-in users to manage their bank accounts, monitor their live account balances, and review their transactions through the admin panel.

**Main Features:**
- Provide your client with a modern-looking dashboard where retail banking customers will be able to manage all their finances conveniently.
- The system will provide the possibility to perform such basic banking actions as accounts management, balances overview, transaction history tracking, etc.

**Our Main Objective:**
- The main objective of this project is to develop a secure and scalable full-stack personal/retail banking management system that provides users with efficient and secure banking operations.
- The system is designed to:
  - Ensure secure user login sessions using JWT authentication.
  - Allow users to fully manage bank entirety, including:
    - Creating accounts
    - Viewing account details
    - Updating account information
    - Delete accounts
  - Displaying balances in accounts and transactions history with endpoints like: `GET /api/accounts/:id`.
  - Roles-based access control with CUSTOMER and ADMIN roles.
  - Protection of user's data through:
    - Input validation and sanitization
    - Secure password storage and encryption
    - Vulnerability prevention techniques
    - Security middleware such as Helmet and rate limiting
  - Provide a reliable, maintainable, and user-friendly banking platform with modern full-stack technologies.

**UI and Design Requirements:**
- The application should provide a clean, secure, and professional user interface that delivers a smooth user experience across all devices. The dashboard and application interface should include the following components and requirements:
  - User Login and Registration Page with authentication mechanism along with client-side validation.
  - Main Dashboard Page showing account summary, balance, and activity.
  - Account Details Page showing all information regarding account including transactions history.
  - Personal Profile Page where the user can modify his profile information such as name, email address, and phone number.
  - Admin Dashboard Page from where an administrator can manage all the activities of customers.
- Layout must be:
  - A fully responsive interface that works smoothly on mobile devices (320px and above), tablets, and desktop screens.
  - Interface that performs well on both mobile devices (320px and up), tablet, and computer screens.
  - Accessibility that is enabled via the use of semantic HTML, ARIA labeling, and keyboard accessibility.
  - Simple, elegant, and stylish design inspired by the look of banks, using simple white interfaces, proper sections, and excluding any use of gradient or other distracting design elements.
  - Optimized performance where list-based API endpoints respond within 500ms under normal conditions.
  - Pagination support for transaction history, displaying 20 records per page for improved usability and performance.

**Core Module:**
- Account Creation – Allow authenticated users to be able to create SAVINGS or CURRENT account through `POST /api/accounts`. Account Number and Active Status should be included in the system with the account number provided and account default status being ACTIVE.
- Account Details – The user should retrieve account details such as the account number, account type, account balance, and account status from `GET /api/accounts/:id` API request.
- Account Edit – Allow users to edit account details such as the name, email address, and contact information using `PUT/PATCH /api/users/:id` requests with validation and authentication measures.
- Account Delete – Offer users an option to delete or close their account by changing account status from ACTIVE to CLOSED using `PATCH /api/accounts/:id/status` request.
- Account Transaction Details – The user should receive the transactions performed in the account through `GET /api/accounts/:id/transactions` with fields like transaction date, remarks, and transaction types(CREDIT/DEBIT) with pagination of 20 records per page.
- Account Balance – Show current account balances on both dashboard and account page through retrieving fresh data from API calls rather than relying on WebSockets in the MVP version.
- Multiple Accounts – Enable one user to have many accounts.
- Security & Authentication – Secure routes through JWT authentication, role-based access for CUSTOMER and ADMIN, and security middleware.

**Backend Requirements:**
- Build a RESTful API using Node.js and Express.js.
- All responses must follow:
  - Success: `{ success: true, data: {...} }`
  - Error: `{ success: false, message: "..." }`
- Authentication APIs:
  - `POST /api/auth/register` — Register user
  - `POST /api/auth/login` — Login user and return JWT token
  - `POST /api/auth/refresh` — Refresh access token
  - `POST /api/auth/logout` — Logout user
- Account APIs:
  - `GET /api/accounts` — Get logged-in user accounts
  - `GET /api/accounts/:id` — Get single account details
  - `POST /api/accounts` — Create SAVINGS or CURRENT account
  - `PUT /api/accounts/:id` — Update account information
  - `DELETE /api/accounts/:id` — Soft-delete account by setting status to CLOSED
- Transaction APIs:
  - `GET /api/accounts/:id/transactions` — Get paginated transaction history (`?page=1&limit=20`)
  - `POST /api/transactions` — Create DEBIT or CREDIT transaction and update account balance
- Admin APIs:
  - `GET /api/admin/accounts` — Get all accounts with filters like status and userId
- Security Requirements:
  - Use JWT authentication and RBAC (CUSTOMER, ADMIN)
  - Validate input using Zod
  - Use Helmet, rate limiting, CORS, and secure cookies
  - Log important actions using Winston logging

**Database:**
- MongoDB (Mongoose), PostgreSQL (Sequelize/Prisma) for persistent storage
- Schema design for:
  - User (auth info, personal details)
  - Account (account type, balance, status, owner)
  - Transaction (amount, type, date/time, description, account)

**Authentication & Security:**
- Use JWT authentication with:
  - Access Token: 15 min expiry
  - Refresh Token: 7 days in HttpOnly cookie
  - Use `POST /api/auth/refresh` for token refresh
- Password encryption by bcrypt (saltRounds: 12)
- Use `authenticateToken` middleware for all private routes.
- Implement RBAC using CUSTOMER and ADMIN roles
- Secrets management using dotenv in `.env`
- Apply rate limiting:
  - Auth APIs: 5 requests / 15 min
  - Global APIs: 100 requests / 15 min
- Configure secure CORS and use `helmet()` middleware.
- Do not reveal passwords, tokens or other sensitive information in response.
- Logs should be stored for login, profile update, sign up and delete user
- Validate and sanitize all request data.

**Data Processing & Validation Requirements:**
- Sanitise all inputs to prevent XSS and NoSQL injection attacks.
- Validate with Zod schemas:
  - `email` — valid email format
  - `password` — minimum 12 characters
  - `accountType` — enum: SAVINGS | CURRENT
  - `amount` — positive number, max 2 decimal places
  - `type` (transaction) — enum: DEBIT | CREDIT
  - All required fields enforced on every endpoint
- API must return structured JSON responses:
  - `{ success: true, data: {...} }` on success
  - `{ success: false, message: "..." }` on error

**Security Requirements:**
- Rate limiting on auth endpoints to prevent brute force attacks
- HTTPS-ready configuration
- Sensitive data (passwords, tokens) never returned in API responses
- Audit logging for critical actions (account creation, closure, profile updates)

**Error Handling:**
- Frontend: display field-level validation errors inline on forms
- Frontend: show toast notifications for every user action (success and error states)
- Backend: Zod validation errors → HTTP 400 with structured error array
- Backend: Auth related error - Send 401(unauthorized), 403(unauthorized).
- Backend: Not Found error - Send 404.
- Backend: all unexpected errors logged via Winston with timestamp, method, URL, and IP
- Never expose stack traces or internal error messages in API responses

**Output Requirements:**
- Functional, secure account management system
- Clean dashboard with live-fetched account data (no hardcoded data in UI)
- All CRUD operations wired end-to-end via Axios
- Graceful error handling throughout
- Toast / alert confirmation after every user action

**Documentation Requirements:**
- Documentation must include:
  - Frontend and backend folder structure
  - Setup instructions and npm install steps
  - `.env.example` with all required variables
  - Configuration of environment variables (`.env.example`):
    - `PORT=5000`
    - `JWT_SECRET=your_jwt_secret_here`
    - `JWT_REFRESH_SECRET=your_refresh_secret_here`
    - `MONGODB_URI=mongodb://localhost:27017/banking`
    - `CORS_ORIGIN=http://localhost:3000`
    - `BCRYPT_ROUNDS=12`
    - `NODE_ENV=development`
  - List of API endpoints Steps for deployment (such as on Render, Railway, and Vercel.)

**Technology Stack:**
- Frontend: React, Tailwind CSS
- Middleware: Axios
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose) OR PostgreSQL (Prisma)
- Auth: JWT + bcrypt
- Configurations: dotenv
- Optional: Redis (Session caching)
- Logging: Winston
