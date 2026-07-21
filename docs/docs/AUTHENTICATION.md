<div align="center">

# 🔐 Authentication

### Project Mercury

**Version:** v0.5

---

*"Security should be invisible to users, not to developers."*

</div>

---

# Overview

Gan Engine supports two authentication methods:

- Google OAuth 2.0
- Guest Session

Both methods ultimately generate the same authentication mechanism:

JWT stored inside an HTTP-only cookie.

---

# Authentication Flow

```text
User

↓

Choose Login Method

↓

Google OAuth
        OR
Guest Login

↓

User Created / Retrieved

↓

JWT Generated

↓

HTTP-only Cookie

↓

Authenticated Session

↓

Access Protected APIs
```

---

# Google Authentication

```text
Browser

↓

GET /api/auth/google

↓

Google OAuth

↓

Passport.js

↓

Google Callback

↓

Find/Create User

↓

JWT

↓

Cookie

↓

Dashboard
```

---

# Guest Authentication

```text
Browser

↓

GET /api/auth/guest

↓

UUID Generated

↓

Guest User Created

↓

JWT Generated

↓

Cookie Stored

↓

Dashboard
```

---

# Session Validation

Every protected request automatically includes the JWT cookie.

```text
Browser

↓

Cookie

↓

JWT Verification

↓

User Lookup

↓

Request Authorized
```

---

# Logout

```text
Browser

↓

GET /api/auth/logout

↓

Clear Cookie

↓

JWT Removed

↓

Guest State
```

---

# Security Features

- HTTP-only Cookies
- JWT Authentication
- Google OAuth 2.0
- Protected Routes
- Environment Variables
- Server-side Validation

---

# Future Improvements

- Refresh Tokens
- Email Verification
- Multi-factor Authentication
- Device Management
- Session Expiration

---

<div align="center">

Gan Engine Authentication • v0.5

</div>