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

## MongoDB Atlas DNS Resolution Error (`querySrv ECONNREFUSED`)

### Problem

When starting the server, you may encounter the following error:

```text
❌ Initial MongoDB Connection Failed
Error: querySrv ECONNREFUSED _mongodb._tcp.<your-cluster>.mongodb.net
```

or

```text
MongoServerSelectionError: querySrv ECONNREFUSED
```

---

### Cause

This issue occurs when Node.js is unable to resolve the MongoDB Atlas SRV DNS record.

Common causes include:

- ISP DNS server issues
- Router DNS configuration
- Public or corporate Wi-Fi restrictions
- macOS DNS resolver problems
- Network environments blocking SRV lookups

---

### Solution

Configure Node.js to use Cloudflare DNS before establishing the MongoDB connection.

At the very top of `server.js`, add:

```javascript
require("dotenv").config();

const dns = require("node:dns");

// Force Cloudflare DNS for MongoDB Atlas SRV resolution
dns.setServers(["1.1.1.1", "1.0.0.1"]);
```

Restart the server:

```bash
npm run dev
```

or

```bash
npm start
```

---

### Why this works

MongoDB Atlas uses SRV DNS records (`mongodb+srv://`) to discover the cluster nodes.

If your system DNS server cannot resolve SRV records correctly, Node.js cannot locate your MongoDB cluster and the connection fails.

Using Cloudflare DNS (`1.1.1.1` and `1.0.0.1`) bypasses the faulty DNS resolver and allows the application to resolve the cluster successfully.

---

### Alternative Solutions

- Change your operating system DNS servers to:
  - Primary: `1.1.1.1`
  - Secondary: `1.0.0.1`

- Or use Google DNS:
  - `8.8.8.8`
  - `8.8.4.4`

- Verify that your MongoDB Atlas connection string is correct.

- Ensure your internet connection allows DNS SRV lookups.

---

### Status

✅ Resolved by configuring Node.js to use Cloudflare DNS before connecting to MongoDB Atlas.

<div align="center">

Happy Debugging 🚀

</div>