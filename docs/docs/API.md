<div align="center">

# 🔌 Gan Engine REST API Documentation

### Project Mercury

**Version:** v0.5

---

*"Simple APIs. Transparent mathematics."*

</div>

---

# 📖 Overview

Gan Engine exposes a RESTful API used by the Progressive Web Application (PWA).

The API is responsible for:

- Authentication
- User Sessions
- Watchlists
- Alerts
- Stock Search
- Market Data

All responses are returned as JSON unless otherwise specified.

---

# 🌐 Base URL

Development

```
http://localhost:3000/api
```

Production

```
https://your-domain.com/api
```

---

# 🔐 Authentication

Gan Engine authenticates users using:

- Google OAuth
- Guest Sessions
- JWT Tokens
- HTTP-only Cookies

The frontend automatically includes authentication cookies using:

```javascript
credentials: "include"
```

---

# 📦 Response Format

Successful response

```json
{
    "success": true,
    "data": {}
}
```

Error response

```json
{
    "success": false,
    "message": "Something went wrong."
}
```

---

# 🔑 Authentication Endpoints

---

## Guest Login

### GET

```
/auth/guest
```

Creates a temporary guest account.

### Response

```json
{
    "success": true,
    "user": {}
}
```

---

## Google Login

### GET

```
/auth/google
```

Starts the Google OAuth flow.

---

## Google Callback

### GET

```
/auth/google/callback
```

Creates a JWT and redirects to the dashboard.

---

## Session

### GET

```
/auth/session
```

Returns the currently authenticated user.

### Response

```json
{
    "loggedIn": true,
    "user": {}
}
```

---

## Logout

### GET

```
/auth/logout
```

Clears the authentication cookie.

### Response

```json
{
    "success": true,
    "message": "Logged out successfully."
}
```

---

# ⭐ Watchlist API

---

## Get Watchlist

### GET

```
/watchlist
```

Returns all watchlist entries for the authenticated user.

---

## Add Stock

### POST

```
/watchlist
```

Example Request

```json
{
    "symbol": "RELIANCE.NS"
}
```

---

## Delete Stock

### DELETE

```
/watchlist/:id
```

Removes a stock from the watchlist.

---

# 🔔 Alerts API

---

## Get Alerts

### GET

```
/alerts
```

Returns all alerts for the current user.

---

## Create Alert

### POST

```
/alerts
```

Example

```json
{
    "symbol": "TCS.NS",
    "type": "Resistance",
    "target": 3600
}
```

---

## Delete Alert

### DELETE

```
/alerts/:id
```

Deletes an existing alert.

---

# 📈 Stocks API

---

## Search Stocks

### GET

```
/stocks/search?q=reliance
```

Returns matching stocks.

---

## Stock Details

### GET

```
/stocks/:symbol
```

Returns detailed market information.

Example

```
/stocks/RELIANCE.NS
```

---

## Live Quote

### GET

```
/stocks/:symbol/quote
```

Returns the latest market price.

---

# 📊 HTTP Status Codes

| Code | Meaning |
|------|----------|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|500|Internal Server Error|

---

# 🔄 Request Lifecycle

```text
Browser

↓

HTTP Request

↓

Express Router

↓

Controller

↓

Service

↓

MongoDB / Yahoo Finance

↓

JSON Response

↓

Frontend
```

---

# 🔒 Protected Routes

The following routes require authentication.

```
/watchlist

/alerts

/auth/session

/auth/logout
```

Unauthenticated users receive an authorization error.

---

# ⚙️ API Principles

The REST API follows these principles.

- Stateless requests
- Resource-oriented URLs
- JSON communication
- JWT authentication
- HTTP status codes
- Modular controllers
- Service-oriented architecture

---

# 🚀 Future Endpoints

Upcoming releases will introduce:

```
/portfolio

/backtest

/analytics

/notifications

/preferences

/history

/insights
```

---

# 📌 API Summary

Gan Engine exposes a lightweight REST API designed around modular resources.

Authentication, watchlists, alerts, stock information, and future portfolio features are all accessed through independent endpoints, allowing the frontend and backend to evolve independently.

---

<div align="center">

**Gan Engine REST API Documentation • Version 0.5**

</div>