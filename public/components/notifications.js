async function checkNotifications() {

    try {

        const result = await API.getNotifications();

        if (!result.success || !result.data.length) return;

        for (const alert of result.data) {

            if (Notification.permission === "granted") {

                new Notification("🚨 Gan Engine", {

                    body:
                        `${alert.symbol} reached ${alert.type}\n` +
                        `Target: ₹${alert.targetPrice}`,

                    icon: "/favicon.ico"

                });

            }

            await API.markSeen(alert._id);

        }

    } catch (err) {

        console.error("Notification Error:", err);

    }

}

// Check immediately
// checkNotifications();

// Then every 15 seconds
// setInterval(checkNotifications, 15000);

export default {
    checkNotifications
};