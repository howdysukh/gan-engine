const Watchlist = require("../models/Watchlist");

// GET /api/watchlist
exports.getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: watchlist
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// POST /api/watchlist
exports.addStock = async (req, res) => {
    try {
        let {
            symbol,
            name,
            exchange,
            instrumentType
        } = req.body;

        // Basic Validation
        if (!symbol) {
            return res.status(400).json({
                success: false,
                message: "Stock symbol is required."
            });
        }

        // Sanitize Input
        symbol = symbol.trim().toUpperCase();
        name = name?.trim() || "";
        exchange = exchange || "NSE";
        instrumentType = instrumentType || "EQUITY";

        const stock = await Watchlist.create({
            userId: req.user._id,
            symbol,
            name,
            exchange,
            instrumentType
        });

        return res.status(201).json({
            success: true,
            message: "Stock added successfully.",
            data: stock
        });

    } catch (err) {

        // Duplicate Stock
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Stock already exists in your watchlist."
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// DELETE /api/watchlist/:id
exports.removeStock = async (req, res) => {
    try {
        const result = await Watchlist.deleteOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Stock not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Stock removed successfully."
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};