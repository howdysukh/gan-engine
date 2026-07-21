const API = {

    async request(url, options = {}) {

        const response = await fetch(url, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong.");
        }

        return data;
    },

    async searchStocks(query){

    return this.request(
        `/api/stock/search?q=${encodeURIComponent(query)}`
    );

},

async getStock(symbol) {

    return this.request(`/api/stock/${symbol}`);

},

    // -----------------------
    // User
    // -----------------------

    getUser() {
        return this.request("/api/user");
    },

    // -----------------------
    // Watchlist
    // -----------------------

    getWatchlist() {
        return this.request("/api/watchlist");
    },

    addStock(stock) {
        return this.request("/api/watchlist", {
            method: "POST",
            body: JSON.stringify(stock)
        });
    },

    deleteStock(id) {
        return this.request(`/api/watchlist/${id}`, {
            method: "DELETE"
        });
    },

    getAlerts() {
    return this.request("/api/alerts");
    },

    getNotifications() {
    return this.request("/api/alerts/notifications");
},

markSeen(id) {
    return this.request(`/api/alerts/${id}/seen`, {
        method: "PATCH"
    });
}

};

window.API = API;