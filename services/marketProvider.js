const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

async function getStock(symbol) {
    try {
        const quote = await yahooFinance.quote(`${symbol}.NS`);

        return {
            success: true,
            stock: {
                symbol: quote.symbol,
                company: quote.longName,
                exchange: quote.fullExchangeName,

                price: {
                    current: quote.regularMarketPrice,
                    opening: quote.regularMarketOpen
                },

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