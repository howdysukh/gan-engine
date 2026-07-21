# 🚀 Gan Engine — Installation Guide

Welcome to **Gan Engine**, a real-time stock market monitoring application powered by the **Gann Square of Nine** methodology.

This guide walks you through everything required to set up the project from scratch—even if you've just installed Windows or purchased a brand-new computer.

---

# 📋 Table of Contents

- System Requirements
- Required Software
- Clone the Repository
- Install Dependencies
- Configure Environment Variables
- MongoDB Atlas Setup
- Google OAuth Setup
- Running the Project
- Common Issues
- Useful Commands
- Project Structure

---

# 💻 System Requirements

## Operating Systems

- Windows 10 / 11
- macOS 13+
- Ubuntu 22.04+

---

## Minimum Hardware

| Component | Requirement |
|------------|-------------|
| CPU | Dual-Core Processor |
| RAM | 4 GB |
| Storage | 2 GB Free Space |
| Internet | Required |
| Browser | Chrome, Edge, Firefox |

---

# 🛠 Required Software

## 1. Node.js

Gan Engine requires **Node.js 24.x** or newer.

Download:

https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
```

Expected output:

```bash
v24.x.x
10.x.x or later
```

---

## 2. Git

Download Git:

https://git-scm.com/downloads

Verify:

```bash
git --version
```

---

## 3. Visual Studio Code

Recommended IDE:

https://code.visualstudio.com/

Recommended Extensions:

- ESLint
- Prettier
- GitLens
- Error Lens
- MongoDB for VS Code

---

## 4. MongoDB Atlas Account

Create a free account:

https://www.mongodb.com/cloud/atlas

---

## 5. Google Cloud Console

Create OAuth Credentials:

https://console.cloud.google.com/

---

# 📥 Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/gan-engine.git

cd gan-engine
```

---

# 📦 Install Dependencies

Install all required packages.

```bash
npm install
```

---

# 🔐 Environment Variables

Create a file named:

```
.env
```

inside the project root.

Example:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

Default server access key:
```env
PORT=3000

MONGODB_URI=mongodb+srv://dev:dev1234@gan-engine-oauth-api.1mtxqmx.mongodb.net/?appName=gan-engine-oauth-api

JWT_SECRET=myrandomsecret

GOOGLE_CLIENT_ID=120804524454-djsrqlrkfiu50j2goejk04tfi5seo1u1.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=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

GOOGLE_CALLBACK=http://localhost:3000/api/auth/google/callback
```

---

# ☁ MongoDB Atlas Setup

## Step 1

Create a new cluster.

---

## Step 2

Create a database user.

Example:

```
Username:
dev

Password:
********
```

Default User Log:

```
Username:
dev

Password:
dev1234
```

---

## Step 3

Network Access

Add:

```
0.0.0.0/0
```

to allow connections from anywhere.

---

## Step 4

Copy your connection string.

Example:

```text
mongodb+srv://username:password@cluster.mongodb.net/
```

Paste it inside:

```
MONGODB_URI=
```

---

# 🔑 Google OAuth Setup

Create OAuth credentials from Google Cloud.

Enable:

- Google Identity API

Create:

OAuth Client ID

Authorized JavaScript Origin

```
http://localhost:3000
```

Authorized Redirect URI

```
http://localhost:3000/auth/google/callback
```

Copy the generated values into your `.env`.

---

# ▶ Running the Application

Start the server.

```bash
npm start
```

or

```bash
node server.js
```

You should see:

```text
MongoDB Connected
Server running on port 3000
```

Open:

```
http://localhost:3000
```

---

# ⚠ Common Issues

---

## MongoDB

Error

```text
querySrv ECONNREFUSED
```

Solution

Add the following before connecting to MongoDB.

```javascript
const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1", "1.0.0.1"]);
```

---

## Google OAuth

Error

```text
OAuth2Strategy requires a clientID option
```

Cause

Google OAuth environment variables are missing.

Verify:

```
GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_CALLBACK_URL
```

inside the `.env` file.

---

## Port Already In Use

```text
EADDRINUSE
```

Windows

```cmd
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

macOS/Linux

```bash
lsof -i :3000
kill -9 PID
```

---

# 📚 Useful Commands

Install Packages

```bash
npm install
```

Start Project

```bash
npm start
```

Install New Package

```bash
npm install package-name
```

Update Packages

```bash
npm update
```

Check Versions

```bash
node -v

npm -v

git --version
```

---

# 📁 Project Structure

```
gan-engine/

│
├── config/
├── controllers/
├── middleware/
├── models/
├── public/
├── routes/
├── services/
├── utils/
├── .env
├── package.json
├── server.js
│
└── README.md
```

---

# 🤝 Contributing

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit changes.

```bash
git commit -m "Added new feature"
```

4. Push.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ by SUKH and the Team.