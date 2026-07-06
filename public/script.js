const searchBtn = document.getElementById("searchBtn");
const stockInput = document.getElementById("stockInput");

const loading = document.getElementById("loading");
const marketCard = document.getElementById("marketCard");
const gannSection = document.getElementById("gannSection");

searchBtn.addEventListener("click", analyzeStock);

stockInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        analyzeStock();

    }

});

async function analyzeStock() {

    const symbol = stockInput.value.trim().toUpperCase();

    if (!symbol) {

        alert("Please enter a stock symbol.");

        return;

    }

    loading.classList.remove("hidden");

    marketCard.classList.add("hidden");

    gannSection.classList.add("hidden");

    try {

        const response = await fetch(`/api/stock/${symbol}`);

        const data = await response.json();

        loading.classList.add("hidden");

        if (!data.success) {

            alert(data.message);

            return;

        }

        const stock = data.stock;

        // Market Card

        document.getElementById("company").textContent =
            stock.company;

        document.getElementById("exchange").textContent =
            stock.exchange;

        document.getElementById("currentPrice").textContent =
            "₹ " + stock.market.current;

        document.getElementById("openingPrice").textContent =
            "₹ " + stock.market.opening;

        // Gann Levels

        document.getElementById("support45").textContent =
            "₹ " + stock.gann.levels[0].lower;

        document.getElementById("resistance45").textContent =
            "₹ " + stock.gann.levels[0].upper;

        document.getElementById("support90").textContent =
            "₹ " + stock.gann.levels[1].lower;

        document.getElementById("resistance90").textContent =
            "₹ " + stock.gann.levels[1].upper;

        marketCard.classList.remove("hidden");

        gannSection.classList.remove("hidden");

        loadTradingView(stock.symbol);

    }

    catch (err) {

        loading.classList.add("hidden");

        console.error(err);

        alert("Something went wrong.");

    }

}

function loadTradingView(symbol) {

    const container = document.getElementById("chartContainer");

    container.innerHTML = "";

    container.innerHTML = `

<div class="tradingview-widget-container" style="height:520px;width:100%">

<div id="tradingview_chart"></div>

</div>

`;

    const script = document.createElement("script");

    script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.async = true;

    script.innerHTML = JSON.stringify({

        autosize: true,

        symbol: "NSE:" + symbol,

        interval: "D",

        timezone: "Asia/Kolkata",

        theme: "dark",

        style: "1",

        locale: "en",

        allow_symbol_change: false,

        hide_side_toolbar: true,

        save_image: false,

        calendar: false,

        backgroundColor: "#161b22",

        gridColor: "rgba(255,255,255,0.06)",

        hide_volume: false,

        support_host: "https://www.tradingview.com"

    });

    container.appendChild(script);

}

document.getElementById("notifyBtn").addEventListener("click", () => {

    alert(
`🔔 Reminder Feature

This feature is currently under development.

For this beta prototype,
notifications are not yet available.

You'll be able to receive alerts
when price reaches your selected
Gann levels in a future release. 🚀`
    );

});