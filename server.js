const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const stockRoutes = require("./routes/stockRoutes");
// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/stock", stockRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Test API
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "🚀 Gan Engine API is Running",
        version: "0.1.0"
    });
});

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Gan Engine running on http://localhost:${PORT}`);
});