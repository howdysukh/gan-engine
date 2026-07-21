const mongoose = require("mongoose");

async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("✅ MongoDB Connected");

        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB Connection Error:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB Disconnected");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("🔄 MongoDB Reconnected");
        });

    } catch (err) {

        console.error("❌ Initial MongoDB Connection Failed");
        console.error(err);

        process.exit(1);

    }

}

module.exports = connectDB;