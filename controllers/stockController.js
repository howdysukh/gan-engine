const Stock = require("../models/Stock");

exports.searchStocks = async (req, res) => {

    try {

        const query = req.query.q?.trim();

        if (!query) {

            return res.json({
                success: true,
                data: []
            });

        }

        const stocks = await Stock.find({

            isActive: true,

            $or: [

                {
                    symbol: {
                        $regex: "^" + query,
                        $options: "i"
                    }
                },

                {
                    name: {
                        $regex: query,
                        $options: "i"
                    }
                }

            ]

        })
        .limit(10)
        .lean();

        res.json({

            success: true,
            data: stocks

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,
            message: "Search failed."

        });

    }

};