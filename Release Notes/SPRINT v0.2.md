# 🚀 Sprint: v0.2.0 – Market Data Integration

## 🎯 Objective

By the end of this version, the following should work:

```text
User

↓

Searches "RELIANCE"

↓

Backend

↓

Fetches live market data

↓

Returns

Company Name
Current Price
Today's Opening Price
Exchange
Last Updated

↓

Displays on the webpage
```

No Gann.

No support.

No resistance.

Just **real market data**.

---

# 🧠 First Design Decision

This is the only important thing we need to decide before writing code.

## Where do we get stock data from?

Our ideal provider should:

* ✅ Support Indian stocks (NSE/BSE)
* ✅ Provide live/current price
* ✅ Provide today's opening price
* ✅ Have a free tier
* ✅ Be reliable
* ✅ Be easy to integrate with Node.js

If we choose well now, we won't have to rewrite the backend later.

---

# 📦 Our Backend Structure (Starting Today)

Our project is about to grow a little.

```text
gan-engine/

│

├── public/

│     index.html
│     style.css
│     script.js

│

├── routes/
│     stockRoutes.js

│

├── services/
│     marketService.js

│

├── server.js

│

├── package.json

│

└── README.md
```

Notice something?

We're already separating responsibilities.

* `marketService.js` → Talks to the stock market.
* `stockRoutes.js` → Defines API endpoints.
* `server.js` → Starts the application.

That's clean architecture without making things complicated.

---

# 🌐 Our First Real API

Soon, your browser will call:

```text
GET /api/stock/RELIANCE
```

The backend will return something like:

```json
{
  "success": true,
  "symbol": "RELIANCE",
  "companyName": "Reliance Industries Ltd",
  "currentPrice": 1546.35,
  "openingPrice": 1540.10,
  "exchange": "NSE",
  "lastUpdated": "2026-07-06T12:30:00Z"
}
```

That response is the contract between our backend and frontend.

---

# 🎨 Frontend (v0.2)

Our page will become:

```text
────────────────────────────────

Gan Engine

Search Stock

[______________]

[ Search ]

────────────────────────────────

Company

Reliance Industries Ltd

Symbol

RELIANCE

Current Price

₹1546.35

Opening Price

₹1540.10

Exchange

NSE

Last Updated

12:30 PM

────────────────────────────────
```

Simple.

Professional.

No fancy design yet.

---

# 🏗️ Git Workflow

Before we write a single line of code, create a new commit once we finish this version.

We'll tag it as:

```text
v0.2.0
```

Commit message:

```text
feat: integrate live market data
```

Every version gets its own release.

---

# 🧭 The Rule We're Following

Every version must answer exactly **one question**.

* **v0.1** → Can the application run online? ✅
* **v0.2** → Can we retrieve live market data?
* **v0.3** → Can we calculate Gann levels?
* **v0.4** → Can we combine both?

If a feature doesn't belong to the current version, we don't build it yet.

---

# 💡 One More Idea

I want us to start a file called:

```text
CHANGELOG.md
```

Every version we complete, we add an entry.

For example:

```markdown
# Changelog

## v0.2.0 - Market Data Integration
- Added stock search endpoint
- Added live market data service
- Displayed company name, current price, opening price, exchange, and last updated time

## v0.1.0 - Initial Deployment
- Created Express server
- Configured automatic deployment with Render
- Added health API
- Published first live release
```

Six months from now, you'll be able to look back and see exactly how Gan Engine evolved.