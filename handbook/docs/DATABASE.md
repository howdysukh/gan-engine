<div align="center">

# 🗄️ Gan Engine Database Documentation

### Project Mercury

**Version:** v0.5

---

*"Data powers the engine. Mathematics gives it meaning."*

</div>

---

# 📖 Overview

Gan Engine uses **MongoDB Atlas** as its primary database.

The database is designed around a document-oriented model using **Mongoose ODM**, allowing flexible schemas while maintaining structured relationships between users, watchlists, alerts, and market data.

---

# 🏛 Database Architecture

```text
                    MongoDB Atlas

                          │

        ┌─────────────────┼─────────────────┐

        ▼                 ▼                 ▼

      Users          Watchlists         Alerts

                          │

                          ▼

                       Stocks
```

---

# 📂 Collections

Gan Engine currently uses four primary collections.

| Collection | Purpose |
|------------|---------|
| Users | Stores authenticated users |
| Watchlists | Stores saved stocks |
| Alerts | Stores monitoring alerts |
| Stocks | Stores supported stock metadata |

---

# 👤 Users Collection

Stores every registered user.

Both **Google users** and **Guest users** share the same collection.

---

## Example Document

```json
{
  "_id": "...",
  "provider": "google",
  "googleId": "...",
  "guestId": null,
  "name": "John Doe",
  "email": "john@example.com",
  "photo": "https://...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Primary Key |
| provider | String | google or guest |
| googleId | String | Google Account ID |
| guestId | String | UUID for guest users |
| name | String | User's display name |
| email | String | User email |
| photo | String | Profile picture |
| createdAt | Date | Creation timestamp |
| updatedAt | Date | Last modification |

---

# ⭐ Watchlists Collection

Stores every stock saved by a user.

---

## Example Document

```json
{
  "_id": "...",
  "userId": "...",
  "symbol": "RELIANCE.NS",
  "addedAt": "..."
}
```

---

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Primary Key |
| userId | ObjectId | Owner of watchlist |
| symbol | String | Yahoo Finance symbol |
| addedAt | Date | Creation timestamp |

---

# 🔔 Alerts Collection

Stores mathematical alert configurations.

---

## Example Document

```json
{
  "_id": "...",
  "userId": "...",
  "symbol": "TCS.NS",
  "type": "Resistance",
  "target": 3600,
  "enabled": true,
  "createdAt": "..."
}
```

---

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Primary Key |
| userId | ObjectId | Owner |
| symbol | String | Stock symbol |
| type | String | Support or Resistance |
| target | Number | Target price |
| enabled | Boolean | Alert status |
| createdAt | Date | Creation timestamp |

---

# 📈 Stocks Collection

Stores stock metadata used throughout the application.

Market prices are retrieved live from Yahoo Finance.

---

## Example Document

```json
{
  "_id": "...",
  "symbol": "INFY.NS",
  "name": "Infosys Ltd",
  "exchange": "NSE"
}
```

---

## Fields

| Field | Type | Description |
|------|------|-------------|
| _id | ObjectId | Primary Key |
| symbol | String | Yahoo Finance symbol |
| name | String | Company name |
| exchange | String | Market exchange |

---

# 🔗 Collection Relationships

```text
Users
 │
 ├──────────────┐
 │              │
 ▼              ▼
Watchlists    Alerts
 │
 ▼
Stocks
```

Each user owns multiple watchlist items and multiple alerts.

---

# 🔄 Data Flow

```text
User

↓

Authentication

↓

Users Collection

↓

Watchlist Request

↓

Watchlists Collection

↓

Stock Lookup

↓

Yahoo Finance

↓

Gan Engine

↓

Alert Evaluation

↓

Alerts Collection
```

---

# 🧠 Schema Design Principles

The database has been designed around several core principles.

### Simplicity

Each collection represents a single responsibility.

---

### Flexibility

MongoDB allows future schema expansion without migrations.

---

### Performance

Documents remain lightweight for fast retrieval.

---

### Scalability

Collections can grow independently as new features are introduced.

---

### Maintainability

Business logic remains outside database schemas.

---

# 🔒 Data Integrity

Gan Engine enforces several integrity rules.

- Every watchlist belongs to one user.
- Every alert belongs to one user.
- JWT authentication protects user-specific data.
- MongoDB ObjectIds uniquely identify every document.

---

# 🚀 Future Collections

Planned database additions include:

- Portfolio
- Transactions
- Historical Prices
- Backtests
- Notification History
- User Preferences
- Market Sessions
- AI Insights

---

# 📌 Database Summary

Gan Engine uses MongoDB Atlas with Mongoose to provide a flexible, scalable, and maintainable data layer.

The database stores user accounts, watchlists, alerts, and stock metadata while live market prices continue to be retrieved directly from Yahoo Finance.

This hybrid approach keeps the database lightweight while ensuring users always receive the latest market information.

---

<div align="center">

**Gan Engine Database Documentation • Version 0.5**

</div>