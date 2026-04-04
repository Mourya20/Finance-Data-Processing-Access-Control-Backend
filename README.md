Finance-Data-Processing-Access-Control-Backend
Overview

This project is a backend system for a finance dashboard that manages financial records and provides analytics using role-based access control (RBAC).

It is designed to demonstrate clean backend architecture, secure access control, and meaningful financial insights beyond basic CRUD operations. The system simulates real-world financial platforms where different user roles interact with data based on permissions.

Deployment

The backend is deployed using Render.

The project was connected to GitHub and deployed on Render, where the build and start processes are handled automatically.

Live API Base URL:
https://finance-data-processing-access-control-lxp4.onrender.com

Swagger Documentation (Live):
https://finance-data-processing-access-control-lxp4.onrender.com/api-docs

Swagger API Documentation & Testing

Swagger UI is integrated into the application using swagger-ui-express and swagger-jsdoc.

All APIs are exposed through the Swagger interface. After deployment, the APIs were tested directly from the Swagger UI by:

Opening the /api-docs route
Using the "Try it out" feature
Providing request body inputs
Using JWT authentication via the Authorize button

Authentication was tested by first calling /auth/login, copying the token, and then using it in Swagger to access protected routes such as /records, /dashboard, and /budget.

This allowed verification of:

Correct responses
Status codes (200, 201, 401, 403, etc.)
Role-based access restrictions
Data correctness
Linux Deployment Adjustments (Important)

Since the project was developed locally on Windows and deployed on a Linux-based environment (Render), a few changes were required:

Updated Prisma configuration to support Linux runtime:

binaryTargets = ["native", "debian-openssl-3.0.x"]

Ensured Prisma client is generated during deployment using:

prisma generate
Fixed path issues related to schema location
Replaced direct CLI usage with compatible commands when needed
Ensured environment variables are correctly loaded in production

These changes ensured the backend runs properly in a Linux environment without runtime errors.

Setup Steps (Local)
Install dependencies
npm install
Create .env file
JWT_SECRET=your_secret_key
DATABASE_URL="file:./prisma/dev.db"
Setup database
npx prisma generate
npx prisma migrate dev
Start server
npm start

Server runs at: http://localhost:3000

Run tests (optional)
npm test

Swagger Docs (local):
http://localhost:3000/api-docs

Key Features
Authentication & Authorization
JWT-based authentication
Role-based access control (RBAC)
Financial Records
Create, Read, Update, Delete operations
Fields: amount, type, category, date, notes
Pagination, filtering, and search support
Financial Analytics
Summary: total income, expense, net balance
Monthly, Quarterly, Yearly analytics
Includes:
Income
Expense
EBITDA
PAT
Insights
Category-wise expense breakdown
Sorted by highest spending
Budget Tracking
Set category budgets
Compare spending vs limits
Additional Enhancements
Soft delete support
Rate limiting
Swagger API documentation
Unit and integration testing
API Endpoints
Auth
POST /auth/register
POST /auth/login
Records
POST /records
GET /records
PUT /records/:id
DELETE /records/:id
Dashboard
GET /dashboard/summary
GET /dashboard/recent
GET /dashboard/category
GET /dashboard/finance/monthly
GET /dashboard/finance/quarterly
GET /dashboard/finance/yearly
GET /dashboard/category-breakdown
Budget
POST /budget
GET /budget/check
Roles Explanation
Admin
Full access to system
Can create, update, delete records
Can manage users
Analyst
Can view records
Can access analytics
Viewer
Can only view dashboard data
Cannot modify records
Tech Stack
Node.js with Express
Prisma ORM
SQLite
JWT Authentication
Jest and Supertest
Swagger
Project Structure
zorovyn/
│
├── src/
│   ├── controllers/        # Route handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic (Prisma queries)
│   ├── middleware/         # Auth, RBAC, rate limiting
│   └── utils/              # Prisma client, JWT helpers
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Prisma migrations
│
├── tests/                  # Jest + Supertest
│
├── app.js                  # Express app setup
├── server.js               # Entry point
├── package.json
├── .env
└── README.md
Design Notes
RBAC implemented using middleware for simplicity
Prisma used for structured database interaction
Raw SQL used for time-based analytics
APIs grouped into summary, analytics, and insights
Assumptions
Tax is simplified as 10% of profit
All expenses treated as operating expenses
SQLite used for simplicity
Tradeoffs Considered
SQLite chosen for simplicity instead of scalable databases
Financial calculations simplified instead of full accounting models
Raw SQL used for performance but reduces portability
Middleware-based RBAC instead of advanced policy engines
Limited test coverage focusing on core functionality
Additional Notes
Swagger is integrated directly inside the application (no separate config file initially)
APIs were tested manually using Swagger after deployment
Some debugging involved handling JSON formatting issues and JWT headers
Prisma errors were handled explicitly (e.g., record not found cases)
Deployment required environment-specific fixes (especially for Prisma)
Conclusion

This project demonstrates backend architecture, financial data processing, and role-based access control with practical deployment and API testing. It goes beyond basic CRUD operations by including analytics, validation, and structured API design.
