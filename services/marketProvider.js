const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();
const { calculateLevels } = require("./gannEngine");

async function getStock(symbol) {
    try {

        const quote = await yahooFinance.quote(`${symbol}.NS`);

        // Calculate Gann levels using the opening price
        const gann = calculateLevels(
            quote.regularMarketOpen
        );

        return {
            success: true,

            stock: {
                // Remove ".NS" from the API response
                symbol: quote.symbol.replace(".NS", ""),

                company: quote.longName,

                exchange: quote.fullExchangeName,

                market: {
                    current: quote.regularMarketPrice,
                    opening: quote.regularMarketOpen,
                    currency: "INR"
                },

                // Gan Engine Output
                gann,

                updatedAt: new Date().toISOString()
            }
        };

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: error.message
        };

    }
}

module.exports = {
    getStock
};