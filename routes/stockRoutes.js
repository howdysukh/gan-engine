const express = require("express");
const router = express.Router();

const { getStock } = require("../services/marketProvider");

router.get("/:symbol", async (req, res) => {

    const symbol = req.params.symbol.toUpperCase();

    const result = await getStock(symbol);

    res.json(result);

});

module.exports = router;