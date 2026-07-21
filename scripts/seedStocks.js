require("dotenv").config();

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const Stock = require("../models/Stock");

async function seed() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        const stocks = [];
        let firstRow = true;

        fs.createReadStream(path.join(__dirname, "../data/nse_equity.csv"))
            .pipe(csv({
    mapHeaders: ({ header }) => header.trim()
}))
            .on("data", (row) => {

                // Print the first row so we can verify column names
                if (firstRow) {
                    // console.log("📄 CSV Headers:", Object.keys(row));
                    // console.log("📄 First Row:", row);
                    firstRow = false;
                }

                const symbol = row["SYMBOL"]?.trim();
                const name = row["NAME OF COMPANY"]?.trim();
                const series = row["SERIES"]?.trim();
                const isin = row["ISIN NUMBER"]?.trim();

                if (!symbol || !name) return;

                // Import only Equity series
                if (series !== "EQ") return;

                stocks.push({
                    symbol,
                    name,
                    instrumentType: series,
                    isin,
                    exchange: "NSE",
                    isActive: true
                });

            })
            .on("end", async () => {

                try {

                    console.log(`📄 Parsed ${stocks.length} stocks`);

                    await Stock.deleteMany({});
                    await Stock.insertMany(stocks);

                    console.log(`✅ Seeded ${stocks.length} NSE stocks`);

                    await mongoose.disconnect();
                    process.exit(0);

                } catch (err) {

                    console.error("❌ Database Error:", err);

                    await mongoose.disconnect();
                    process.exit(1);

                }

            })
            .on("error", async (err) => {

                console.error("❌ CSV Read Error:", err);

                await mongoose.disconnect();
                process.exit(1);

            });

    } catch (err) {

        console.error("❌ Connection Error:", err);
        process.exit(1);

    }

}

seed();