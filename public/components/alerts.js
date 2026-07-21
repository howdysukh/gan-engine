const Alerts = {

    async init() {

        await this.load();

    },

    async load() {

        const response = await fetch("/api/alerts");

        const data = await response.json();

        if (!data.success) return;

        this.render(data.alerts);

    },

    render(alerts) {

    const container = document.getElementById("alertsContainer");

    container.style.display = "grid";
    container.innerHTML = "";

    if (!alerts.length) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>No active alerts</h3>
                <p>Create an alert from any stock.</p>
            </div>
        `;

        return;

    }

    alerts.forEach(alert => {

        const card = document.createElement("div");

        card.className = "watchlist-card";

        card.innerHTML = `

<div class="stock-info">

    <div class="stock-name">

        ${alert.symbol}

    </div>

    <div class="stock-symbol">

        Target Price • ₹${Number(alert.targetPrice).toFixed(2)}

    </div>

    <span class="alert-type ${alert.type.toLowerCase()}">

        ${alert.type}

    </span>

</div>

<button
    class="remove-alert"
    onclick="Alerts.delete('${alert._id}')"
    title="Delete Alert">

    ✕

</button>

`;

        container.appendChild(card);

    });

},

    async delete(id) {

    await fetch(`/api/alerts/${id}`, {
        method: "DELETE"
    });

    this.load();

}

};

window.Alerts = Alerts;