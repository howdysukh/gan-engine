<div align="center">

# 🏗️ Gan Engine Architecture

### Project Mercury

**Version:** v0.5

---

*"We don't predict the market. We monitor the mathematics behind it."*

</div>

---

# 📖 Overview

Gan Engine follows a modular client-server architecture designed for scalability, maintainability, and real-time market monitoring.

Instead of embedding business logic inside the frontend, the application separates responsibilities into dedicated layers responsible for authentication, data processing, mathematical calculations, market monitoring, and user interaction.

---

# 🏛 High-Level Architecture

```text
                        User

                         │

                         ▼

                 Progressive Web App

        (HTML • CSS • JavaScript • Fetch API)

                         │

                  HTTP / REST Requests

                         │

                         ▼

                 Express.js Backend API

      ┌──────────────────┼──────────────────┐

      ▼                  ▼                  ▼

Authentication      Market Services     Database Layer

      │                  │                  │

Passport.js      Yahoo Finance API     MongoDB Atlas

      │                  │                  │

      └──────────────┬─────────────────────┘

                     ▼

             Gan Engine Services

        Gann Square of Nine Engine

                     │

                     ▼

            Mathematical Calculations

                     │

                     ▼

              JSON API Responses

                     │

                     ▼

               Dashboard Interface

                     │

                     ▼

          Browser Notifications & Alerts
```

---

# 🧩 System Components

---

## 🎨 Frontend Layer

The frontend provides the complete user interface responsible for presenting market information and interacting with the backend services.

### Responsibilities

- Dashboard
- Stock Search
- Watchlists
- Alerts
- Authentication
- Browser Notifications
- Navigation
- Responsive Layout

---

## 🌐 Backend Layer

The Express.js server acts as the central communication layer between the frontend and all external services.

Responsibilities include:

- Authentication
- JWT Management
- API Routing
- Database Communication
- Market Data Processing
- Business Logic
- Alert Management

---

## 🔐 Authentication Layer

Authentication supports two independent login methods.

### Google OAuth

```
User

↓

Google Login

↓

Google OAuth

↓

Passport.js

↓

JWT Generation

↓

HTTP-only Cookie

↓

Authenticated Session
```

### Guest Login

```
Guest User

↓

UUID Generation

↓

Temporary User Creation

↓

JWT Generation

↓

HTTP-only Cookie

↓

Authenticated Session
```

---

# 🗄 Database Layer

Gan Engine stores all persistent application data inside MongoDB Atlas.

Current collections include:

```
Users

Watchlists

Alerts

Stocks
```

Each collection is independently managed through dedicated Mongoose models.

---

# 📈 Market Data Layer

Gan Engine retrieves live market information using Yahoo Finance.

Responsibilities include:

- Current Price
- Opening Price
- Daily Change
- Market Status
- Symbol Information

No market data is permanently stored unless required by future releases.

---

# 🧮 Gan Engine Mathematical Layer

The mathematical engine is the core of the application.

Responsibilities include:

- Gann Square of Nine calculations
- Support calculation
- Resistance calculation
- Percentage movement
- Distance calculations
- Level monitoring

The engine never predicts future prices.

It continuously compares live prices against mathematically calculated levels.

---

# 🔔 Alert Engine

The alert engine continuously evaluates monitored stocks.

Workflow

```
Watchlist

↓

Current Price

↓

Gann Calculation

↓

Target Level Reached?

↓

YES

↓

Browser Notification
```

Future versions will include:

- Email Alerts
- Push Notifications
- Alert Scheduling
- AI Prioritization

---

# 🔄 Request Lifecycle

```text
User opens Dashboard

↓

Browser sends HTTP Request

↓

Express Route

↓

Controller

↓

Business Service

↓

Yahoo Finance / MongoDB

↓

Gan Engine Calculation

↓

JSON Response

↓

Dashboard Update
```

---

# 📂 Application Layers

```
Presentation Layer

↓

API Layer

↓

Business Logic Layer

↓

Data Layer

↓

External Services
```

---

# 🔒 Security Architecture

Gan Engine implements multiple security layers.

Authentication

- Google OAuth 2.0
- Guest Sessions

Authorization

- JWT Tokens
- HTTP-only Cookies

Database

- MongoDB Atlas Authentication

API

- Environment Variables
- Protected Routes

---

# ⚡ Design Principles

The architecture follows several key engineering principles.

### Separation of Concerns

Each module performs one responsibility.

---

### Scalability

Every major component can evolve independently.

---

### Maintainability

Business logic is isolated from the user interface.

---

### Extensibility

New services can be integrated without redesigning the application.

---

### Transparency

Every mathematical calculation remains explainable and reproducible.

---

# 🚀 Future Architecture

Upcoming versions will introduce additional services.

```
Portfolio Manager

↓

Backtesting Engine

↓

AI Insights

↓

Push Notification Service

↓

Portfolio Analytics

↓

Mobile Client
```

---

# 📌 Architecture Summary

Gan Engine is built around a modular service-oriented architecture where each layer has a clearly defined responsibility.

The frontend focuses on user experience.

The backend manages authentication, APIs, and business logic.

MongoDB stores persistent data.

Yahoo Finance provides live market information.

The Gan Engine mathematical module performs all Gann Square of Nine calculations before delivering actionable market monitoring to the investor.

This separation ensures the application remains scalable, maintainable, and easy to extend as future versions introduce additional analytical capabilities.

---

<div align="center">

**Gan Engine Architecture • Version 0.5**

Built with ❤️, Mathematics, and Curiosity.

</div>