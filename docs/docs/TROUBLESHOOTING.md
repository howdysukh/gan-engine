<div align="center">

# 🛠 Troubleshooting

Version 0.5

</div>

---

# querySrv ECONNREFUSED

## Cause

Node.js DNS resolver issue.

## Solution

```javascript
const dns = require("node:dns/promises");

dns.setServers([
    "1.1.1.1",
    "1.0.0.1"
]);
```

---

# OAuth2Strategy requires clientID

## Cause

Missing Google OAuth environment variables.

## Solution

Verify

- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK

---

# EADDRINUSE

## Cause

Port already occupied.

## Solution

Terminate the existing process or use another port.

---

# Logout returns 404

## Cause

Logout route not registered.

## Solution

```javascript
router.get("/logout", authController.logout);
```

---

# Unexpected identifier bindEvents

## Cause

Missing comma inside object literal.

## Solution

```javascript
},
```

---

# Session always logged out

Possible causes

- Invalid JWT
- Missing cookie
- Wrong JWT secret
- Expired token

---

# MongoDB Connection Failed

Verify

- Internet
- Atlas whitelist
- Username
- Password
- Connection URI

---

<div align="center">

Happy Debugging 🚀

</div>