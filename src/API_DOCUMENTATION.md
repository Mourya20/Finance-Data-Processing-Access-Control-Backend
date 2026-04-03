# API Documentation

## Base URL

http://localhost:3000

---

## Authentication

All protected routes require a JWT token.

### Header Format

```
Authorization: Bearer <token>
```

---

## Auth APIs

### Register

POST /auth/register

Request:

```json
{
  "email": "user@test.com",
  "password": "123456",
  "role": "ADMIN"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@test.com"
  }
}
```

---

### Login

POST /auth/login

Request:

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

---

## Records APIs

### Create Record (Admin only)

POST /records

Request:

```json
{
  "amount": 5000,
  "type": "INCOME",
  "category": "Salary",
  "notes": "Monthly salary"
}
```

---

### Get Records

GET /records?page=1&limit=5&search=Salary

---

### Update Record (Admin only)

PUT /records/:id

---

### Delete Record (Admin only)

DELETE /records/:id

---

## Dashboard APIs

### Summary

GET /dashboard/summary

Response:

```json
{
  "totalIncome": 10000,
  "totalExpense": 5000,
  "netBalance": 5000
}
```

---

### Recent Activity

GET /dashboard/recent

---

### Category Totals

GET /dashboard/category

---

## Financial Analytics

### Monthly

GET /dashboard/finance/monthly

### Quarterly

GET /dashboard/finance/quarterly

### Yearly

GET /dashboard/finance/yearly

Response format:

```json
[
  {
    "period": "2026-01",
    "income": 10000,
    "expense": 4000,
    "ebitda": 6000,
    "pat": 5400
  }
]
```

---

### Category Breakdown

GET /dashboard/category-breakdown

---

## Budget APIs

### Create Budget (Admin only)

POST /budget

Request:

```json
{
  "category": "Food",
  "limit": 5000
}
```

---

### Check Budget

GET /budget/check

Response:

```json
[
  {
    "category": "Food",
    "limit": 5000,
    "spent": 3000,
    "exceeded": false
  }
]
```

---

## Status Codes

* 200 OK → Success
* 201 Created → Resource created
* 400 Bad Request → Invalid input
* 401 Unauthorized → Missing/invalid token
* 403 Forbidden → Access denied
* 500 Internal Server Error → Server error

---

## Notes

* All financial calculations use simplified logic
* Tax is assumed as 10% of profit
* All expenses are treated as operating expenses
