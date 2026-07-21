<div align="center">

# 📂 Project Structure

### Project Mercury

**Version:** v0.5

</div>

---

# Overview

Gan Engine follows a modular folder structure to separate presentation, business logic, data models, and configuration.

---

```text
gan-engine/

├── config/
│
├── controllers/
│
├── docs/
│
├── middleware/
│
├── models/
│
├── node_modules/
│
├── public/
│   ├── assets/
│   ├── css/
│   └── js/
│
├── routes/
│
├── services/
│
├── utils/
│
├── app.js
├── server.js
├── package.json
└── README.md
```

---

# Folder Responsibilities

## config/

Application configuration.

- MongoDB
- Passport
- Environment

---

## controllers/

Request handlers.

- Authentication
- Watchlists
- Alerts
- Stocks

---

## middleware/

Express middleware.

- JWT
- Authentication
- Error Handling

---

## models/

Mongoose schemas.

- User
- Watchlist
- Alert
- Stock

---

## routes/

REST API endpoints.

---

## services/

Business logic.

- Yahoo Finance
- Gann Engine
- Notification Engine

---

## public/

Frontend application.

### css/

Application styling.

### js/

Client-side modules.

### assets/

Images and icons.

---

## docs/

Project documentation.

---

## utils/

Reusable helper functions.

---

# Design Philosophy

Each folder has one responsibility.

Business logic never belongs inside routes.

Database logic never belongs inside the frontend.

UI never performs mathematical calculations.

---

<div align="center">

Gan Engine Project Structure • v0.5

</div>