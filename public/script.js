import Notifications from "./components/notifications.js";

document.addEventListener("DOMContentLoaded", async () => {

    console.log("🚀 Gan Engine v0.5 initialized");

    if ("Notification" in window &&
        Notification.permission !== "granted") {

        await Notification.requestPermission();
    }

    Auth.init();
    Watchlist.init();
    Dashboard.init();
    Watchlist.load();
    Alerts.init();
    Search.init();

    // Notifications.checkNotifications();

});