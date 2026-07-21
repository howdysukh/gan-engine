const Watchlist = {

    stocks: [],

    elements: {
        container: null,
        empty: null,
        addButton: null
    },

    init() {

    console.log("✅ Watchlist initialized");

    this.elements.container = document.getElementById("watchlistContainer");
    this.elements.empty = document.getElementById("watchlistEmpty");
    this.elements.addButton = document.getElementById("addStockBtn");

    this.bindEvents();

},

    bindEvents() {

    document.addEventListener("click", async (e) => {

        if (!e.target.classList.contains("remove-stock")) return;

console.log("Remove button clicked:", e.target);
        if (!confirm("Remove this stock from your watchlist?")) return;

        await this.remove(e.target.dataset.id);

    });

},

    async load() {

    try {

        const response = await API.getWatchlist();

        this.stocks = response.data || [];

        const subtitle = document.getElementById("watchlistSubtitle");

        if (subtitle) {

            if (this.stocks.length === 0) {

                subtitle.textContent = "Your watchlist is empty.";

            } else if (this.stocks.length === 1) {

                subtitle.textContent = "1 stock being monitored.";

            } else {

                subtitle.textContent = `${this.stocks.length} stocks being monitored.`;

            }

        }

        console.log("📈 Watchlist Loaded:", this.stocks);

        this.render();

        // Refresh dashboard scanner
        if (window.Dashboard) {

            Dashboard.loadScanner();

        }

    } catch (err) {

        console.error("Failed to load watchlist:", err);

    }

},

    async add(stock) {

    try {

        await API.addStock(stock);

        await this.load();

    } catch (err) {

        console.error("Failed to add stock:", err);

        alert(err.message);

    }

},

async remove(id) {

    try {

        await API.deleteStock(id);

        await this.load();

    } catch (err) {

        console.error("Failed to remove stock:", err);

        alert(err.message);

    }

},

    render() {

    if (!this.elements.container) return;
        this.elements.container.style.display = "grid";
        this.elements.container.innerHTML = "";

    if (this.stocks.length === 0) {

        this.elements.container.innerHTML = `
            <div class="empty-state">
                <h3>No stocks in your watchlist</h3>
                <p>Add your first stock to start monitoring.</p>
            </div>
        `;

        return;

    }

    this.stocks.forEach(stock => {

        const card = document.createElement("div");

        card.className = "watchlist-card";

        card.innerHTML = `
<div class="stock-info">

    <div class="stock-name">
        ${stock.name}
    </div>

    <div class="stock-symbol">
        ${stock.symbol}
    </div>

</div>

<button
    class="remove-stock"
    data-id="${stock._id}"
    title="Remove">

    ✕

</button>
`;

        this.elements.container.appendChild(card);

    });

}

};

window.Watchlist = Watchlist;