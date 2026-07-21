const Dashboard = {

    async init() {

        console.log("🚀 Dashboard initialized");

        await this.loadScanner();

    },

    async loadScanner() {

        console.log("📊 Loading scanner...");

        const grid = document.getElementById("scannerGrid");

        // Show loading state
        grid.innerHTML = `
            <div class="scanner-loading">
                <div class="scanner-spinner"></div>
                <p>🧮 Gan Engine is calculating...</p>
            </div>
        `;

        const stocks = Watchlist.stocks;
        document.getElementById("watchlistCount").textContent = stocks.length;

        try {

    const alertResponse = await API.getAlerts();

    if (alertResponse.success) {

        document.getElementById("alertCount").textContent =
            alertResponse.alerts.length;

    }

} catch (err) {

    console.error("Failed to load alerts:", err);

    document.getElementById("alertCount").textContent = "0";

}

        const marketStatus = document.getElementById("marketStatus");

const now = new Date();

// India Time
const indiaTime = new Date(
    now.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata"
    })
);

const day = indiaTime.getDay();

const minutes =
    indiaTime.getHours() * 60 +
    indiaTime.getMinutes();

// Weekend
if (day === 0 || day === 6) {

    marketStatus.innerHTML =
        "<span style='color:#ff5b5b;'>CLOSED</span>";

}
else if (minutes >= 555 && minutes <= 930) {

    // 9:15 AM → 3:30 PM

    marketStatus.innerHTML =
        "<span style='color:#00d26a;'>OPEN</span>";

}
else {

    marketStatus.innerHTML =
        "<span style='color:#ff5b5b;'>CLOSED</span>";

}

try {

    const response = await API.getAlerts();

    if (response.success) {

        document.getElementById("alertCount").textContent =
            response.alerts.length;

    }

} catch (err) {

    console.error("Failed to load alerts:", err);

}
        if (!stocks.length) {

            grid.innerHTML = `
                <div class="card">
                    No stocks in your watchlist.
                </div>
            `;

            return;

        }

        const scannerStocks = [];

        // Fetch live market data
        for (const stock of stocks) {

            const response = await API.getStock(stock.symbol);

            if (!response.success) continue;

            scannerStocks.push(response.stock);

        }

        // Sort by nearest Gann level
        scannerStocks.sort((a, b) => {

            const aClosest = Math.min(
                Math.abs(a.gann.distanceToSupport),
                Math.abs(a.gann.distanceToResistance)
            );

            const bClosest = Math.min(
                Math.abs(b.gann.distanceToSupport),
                Math.abs(b.gann.distanceToResistance)
            );

            return aClosest - bClosest;

        });

        // Render cards
        let html = "";

        scannerStocks.forEach(stock => {

            html += this.renderCard(stock);

        });

        grid.innerHTML = html;

    },

    renderCard(stock) {

    const support = Math.abs(stock.gann.distanceToSupport);
    const resistance = Math.abs(stock.gann.distanceToResistance);

    let status = "Stable";
    let ribbon = "stable";

    if (support <= 1) {

        status = "Near Support";
        ribbon = "support";

    } else if (resistance <= 1) {

        status = "Near Resistance";
        ribbon = "resistance";

    }

    return `

    <div class="scanner-card"
         onclick="Dashboard.openStock('${stock.symbol}')">

        <div class="scanner-ribbon ${ribbon}">
            ${status}
        </div>

        <div class="scanner-content">

            <div class="scanner-symbol">
                ${stock.symbol}
            </div>

            <div class="scanner-company">
                ${stock.company}
            </div>

            <div class="scanner-price">
                ₹${Number(stock.market.current).toLocaleString()}
            </div>

            <div class="scanner-divider"></div>

            <div class="scanner-row">

                <span>↓ Support</span>

                <strong>${support.toFixed(2)}%</strong>

            </div>

            <div class="scanner-row">

                <span>↑ Resistance</span>

                <strong>${resistance.toFixed(2)}%</strong>

            </div>

            <button class="btn btn-primary scanner-btn">

                View Details

            </button>

        </div>

    </div>

    `;

},
        async openStock(symbol) {

    const response = await API.getStock(symbol);

    if (!response.success) return;

    const stock = response.stock;

    document.getElementById("stockTitle").textContent =
        stock.symbol;

    document.getElementById("stockCompany").textContent =
        stock.company;

    document.getElementById("stockPrice").textContent =
        `₹${stock.market.current}`;

    document.getElementById("stockChange").textContent =
        `${stock.market.changePercent}%`;

    document.getElementById("openPrice").textContent =
        stock.market.opening;

    document.getElementById("highPrice").textContent =
        stock.market.high;

    document.getElementById("lowPrice").textContent =
        stock.market.low;

    document.getElementById("supportPrice").textContent =
        stock.gann.nearestSupport;

    document.getElementById("resistancePrice").textContent =
        stock.gann.nearestResistance;

        const button = document.getElementById("createAlertBtn");

button.onclick = async () => {

    const response = await fetch("/api/alerts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            symbol: stock.symbol,
            company: stock.company,
            targetPrice: stock.gann.nearestResistance,
            type: "RESISTANCE"

        })
    });

    const data = await response.json();

    console.log(data);

};

    Navbar.switchView("stock");
    document
    .getElementById("backButton")
    .onclick = () => {

        Navbar.goBack();

    };

}
};

window.Dashboard = Dashboard;