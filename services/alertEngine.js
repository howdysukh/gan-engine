const Alert = require("../models/Alert");
const { getStock } = require("./marketProvider");

async function checkAlerts() {

    console.log("🔍 Checking alerts...");

    const alerts = await Alert.find({

        triggered: false

    });

    console.log(`Found ${alerts.length} active alerts.`);

    for (const alert of alerts) {

    console.log("Fetching:", alert.symbol);

    const result = await getStock(alert.symbol);

    if (!result.success) {

        console.log(`❌ Failed to fetch ${alert.symbol}`);
        continue;

    }

    const currentPrice = result.stock.market.current;

    console.log(
        `${alert.symbol} | Current: ₹${currentPrice} | Target: ₹${alert.targetPrice}`
    );

 // Trigger Resistance Alert
if (
    alert.type === "RESISTANCE" &&
    currentPrice >= alert.targetPrice
) {
    alert.triggered = true;
    alert.triggeredAt = new Date();
    alert.seen = false;

    await alert.save();

    console.log(`🚨 RESISTANCE triggered for ${alert.symbol}`);
}

// Trigger Support Alert
if (
    alert.type === "SUPPORT" &&
    currentPrice <= alert.targetPrice
) {
    alert.triggered = true;
    alert.triggeredAt = new Date();
    alert.seen = false;

    await alert.save();

    console.log(`🚨 SUPPORT triggered for ${alert.symbol}`);
}

}

} 

module.exports = {

    checkAlerts

};