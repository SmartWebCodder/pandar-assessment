# Pandar Assessment — In-Memory Wallet API

A Node.js REST API for managing user wallets with in-memory storage.

## Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev

# Or build and run
npm start
```

## Environment Variables

| Variable               | Description                        | Default     |
|------------------------|------------------------------------|-----------  |
| `NODE_ENV`             | Environment mode                   | `development` |
| `PORT`                 | Server port                        | `3000`      |
| `JWT_SECRET`           | Secret key for JWT tokens          | —           |
| `JWT_EXPIRY`           | Token expiry in seconds            | `86400`     |
| `IDEMPOTENCY_TTL`      | Idempotency key TTL in ms          | `86400000`  |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms            | `60000`     |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window         | `20`        |

---

## API Endpoints

### 1. POST /user

Create a new user with an initial balance of 10,000.

**Body:**
```json
{ "email": "user@abc.xyz" }
```

**Response (201):**
```json
{
  "message": "Account created successfully",
  "data": {
    "email": "user@abc.xyz",
    "token": "eyJhbGci..."
  }
}
```

---

### 2. GET /balance

Get the current wallet balance.

**Header:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "data": {
    "balance": 10000
  }
}
```

---

### 3. POST /add_balance

Add funds to the wallet.

**Header:** `Authorization: Bearer <token>`

**Header:** `Idempotency-Key: <unique-key>`

**Body:**
```json
{ "amount": 5000 }
```

**Response (200):**
```json
{
  "message": "Balance added successfully",
  "data": {
    "balance": 15000
  }
}
```

---

### 4. POST /withdraw

Withdraw funds from the wallet.

**Header:** `Authorization: Bearer <token>`

**Header:** `Idempotency-Key: <unique-key>`

**Body:**
```json
{ "amount": 1000 }
```

**Response (200):**
```json
{
  "message": "Withdrawal successful",
  "data": {
    "balance": 14000
  }
}
```

---

### 5. GET /transactions

Get paginated transaction history (most recent first).

**Header:** `Authorization: Bearer <token>`

**Query Parameters:**

| Parameter | Type   | Default | Description       |
|-----------|--------|---------|-------------------|
| `page`    | number | 1       | Page number       |
| `limit`   | number | 10      | Items per page    |

**Response (200):**
```json
{
  "data": {
    "transactions": [
      {
        "type": "credit",
        "amount": 10000,
        "reference": "initial-abc123",
        "createdAt": "2026-02-17T15:50:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

## Project Structure

```
src/
  server.ts                 # Express app entry point
  controllers/              # Request handlers
  middlewares/               # Auth, validation, rate limiting
  services/                 # Business logic
  schemas/                  # Joi validation schemas
  repository/               # In-memory data stores
  routes/                   # Route definitions
  lib/                      # Utilities (handlers, sanitizer)
```

## Key Features

- **In-memory storage** — no database required
- **JWT authentication** — Bearer token on protected endpoints
- **Idempotency** — duplicate requests return cached responses, scoped per user with configurable TTL expiry
- **Concurrency safety** — both deposits and withdrawals are serialized per user to prevent race conditions
- **Rate limiting** — sliding window on mutating endpoints, configurable via environment variables
- **CORS restriction** — origin and HTTP method whitelist
- **Body size limit** — 50kb cap on JSON payloads to prevent abuse
- **Request logging** — development-only, disabled in production to avoid leaking sensitive data
- **Input validation** — Joi schemas with sanitization
- **Consistent error responses** — no stack traces exposed
