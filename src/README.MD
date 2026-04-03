# Finance Data Processing & Access Control Backend

## Overview

This project is a backend system for a finance dashboard that manages financial records and provides analytics using role-based access control (RBAC).

It is designed to demonstrate clean backend architecture, secure access control, and meaningful financial insights beyond basic CRUD operations.

---

## Setup Steps

1. Install dependencies

```
npm install
```

2. Create `.env` file in root

```
JWT_SECRET=your_secret_key
DATABASE_URL="file:./dev.db"
```

3. Setup database

```
npx prisma generate
npx prisma migrate dev
```

4. Start server

```
npm start
```

Server runs at: http://localhost:3000

5. Run tests (optional)

```
npm test
```

Swagger Docs: http://localhost:3000/api-docs

---

## Key Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control (RBAC)

### Financial Records

* CRUD operations (create, read, update, delete)
* Fields: amount, type, category, date, notes
* Pagination, filtering, and search support

### Financial Analytics

* Summary: total income, expense, net balance
* Monthly, Quarterly, Yearly analytics
* Includes:

  * Income
  * Expense
  * EBITDA (income - expense)
  * PAT (profit after tax, simplified)

### Insights

* Category-wise expense breakdown (sorted)

### Budget Tracking

* Set category budgets
* Track spending vs limit

### Additional Enhancements

* Soft delete
* Rate limiting
* Swagger API documentation
* Unit & integration testing (Jest + Supertest)

---

## API Endpoints

### Auth

* POST /auth/register
* POST /auth/login

### Records

* POST /records
* GET /records
* PUT /records/:id
* DELETE /records/:id

### Dashboard

* GET /dashboard/summary
* GET /dashboard/recent
* GET /dashboard/category
* GET /dashboard/finance/monthly
* GET /dashboard/finance/quarterly
* GET /dashboard/finance/yearly
* GET /dashboard/category-breakdown

### Budget

* POST /budget
* GET /budget/check

---

## Roles Explanation

### Admin

* Full access to system
* Can manage users and records

### Analyst

* Can view records
* Can access analytics

### Viewer

* Can only view dashboard data
* Cannot modify records

---

## Tech Stack

* Node.js, Express
* Prisma ORM
* SQLite
* JWT Authentication
* Jest & Supertest

---

## Design Notes

* RBAC implemented using middleware
* Prisma used for database modeling
* Raw SQL used for efficient analytics queries
* APIs structured into summary, analytics, and insights

---

## Assumptions

* Tax is simplified as 10% of profit
* All expenses treated as operating expenses
* SQLite used for simplicity

---

## Conclusion

This project demonstrates backend design, financial data processing, and role-based access control with a focus on clean structure and meaningful analytics.

## Tradeoffs Considered

* **SQLite over scalable databases**
  Chosen for simplicity and quick setup. Suitable for development and evaluation, but not ideal for large-scale production systems.

* **Simplified financial calculations**
  EBITDA and PAT are calculated using basic assumptions (e.g., fixed tax rate) instead of full accounting standards to keep the system simple and focused on backend logic.

* **Raw SQL for analytics**
  Used for efficient aggregation (monthly, quarterly, yearly) instead of relying entirely on ORM. This improves performance and flexibility but reduces database portability.

* **RBAC via middleware instead of complex policy systems**
  Middleware-based approach keeps implementation simple and easy to understand, though less flexible than advanced policy engines.

* **Limited test coverage**
  Focused on core functionality (authentication and RBAC). Full test coverage was not prioritized to maintain simplicity within time constraints.
