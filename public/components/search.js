const Search = {

    elements: {
        input: null,
        results: null
    },

    timeout: null,

    init() {

        this.elements.input = document.getElementById("stockSearch");
        this.elements.results = document.getElementById("searchResults");

        if (!this.elements.input || !this.elements.results) return;

        this.bindEvents();

    },

    bindEvents() {

        this.elements.input.addEventListener("input", (e) => {

            clearTimeout(this.timeout);

            const query = e.target.value.trim();

            if (query.length < 2) {

                this.clear();
                return;

            }

            this.timeout = setTimeout(() => {

                this.search(query);

            }, 300);

        });

        document.addEventListener("click", (e) => {

            if (
                !this.elements.results.contains(e.target) &&
                e.target !== this.elements.input
            ) {

                this.clear();

            }

        });

    },

    async search(query) {

        try {

            const response = await API.searchStocks(query);

            this.render(response.data || []);

        } catch (err) {

            console.error("Search failed:", err);

            this.clear();

        }

    },

    render(stocks) {

        if (!stocks.length) {

            this.clear();
            return;

        }

        this.elements.results.innerHTML = stocks.map(stock => `

            <div
                class="search-result"
                data-symbol="${stock.symbol}"
                data-name="${stock.name}"
                data-exchange="${stock.exchange}">

                <strong>${stock.symbol}</strong>

                <small>${stock.name}</small>

            </div>

        `).join("");

        this.elements.results.style.display = "flex";

        this.elements.results.querySelectorAll(".search-result").forEach(item => {

            item.addEventListener("click", async () => {

                const stock = {

                    symbol: item.dataset.symbol,
                    name: item.dataset.name,
                    exchange: item.dataset.exchange

                };

                await Watchlist.add(stock);

                this.elements.input.value = "";

                this.clear();

            });

        });

    },

    clear() {

        this.elements.results.innerHTML = "";
        this.elements.results.style.display = "none";

    }

};

window.Search = Search;