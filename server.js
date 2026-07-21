require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const watchlistRoutes = require("./routes/watchlistRoutes");
const connectDB = require("./config/database");
const passport = require("./config/passport");
const alertEngine = require("./services/alertEngine");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");
const alertRoutes = require("./routes/alerts");

const app = express();

const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());


// Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/alerts", alertRoutes);


// Static Files
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Gan Engine API Running"
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// setInterval(() => {

//     alertEngine.checkAlerts();

// }, 30000);

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});