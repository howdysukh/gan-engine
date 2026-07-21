const YahooFinance = require("yahoo-finance2").default;
const fetch = global.fetch;
const yahooFinance = new YahooFinance();
const { calculateLevels } = require("./gannEngine");

async function getStock(symbol) {
    try {

        const quote = await yahooFinance.quote(`${symbol}.NS`);

        // Calculate Gann levels using the opening price
        const gann = calculateLevels(
            quote.regularMarketOpen,
            quote.regularMarketPrice
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

                            previousClose: quote.regularMarketPreviousClose,

                            high: quote.regularMarketDayHigh,

                            low: quote.regularMarketDayLow,

                            volume: quote.regularMarketVolume,

                            change: quote.regularMarketChange,

                            changePercent: quote.regularMarketChangePercent,

                            currency: quote.currency

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

async function searchStocks(query) {

    try {

        const response = await fetch(
            `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=10&newsCount=0`
        );

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
        const stocks = (data.quotes || [])
            .filter(stock =>
                stock.symbol &&
                stock.shortname &&
                stock.symbol.endsWith(".NS")
            )
            .map(stock => ({
                symbol: stock.symbol.replace(".NS", ""),
                company: stock.shortname,
                exchange: "NSE"
            }));

        return stocks;

    } catch (err) {

    console.error("Yahoo Search Error:");
    console.error(err);

    throw err;

}

}

module.exports = {
    getStock,
    searchStocks
};