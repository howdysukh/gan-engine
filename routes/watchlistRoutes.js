const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const watchlistController = require("../controllers/watchlistController");

router.get(
    "/",
    auth,
    watchlistController.getWatchlist
);

router.post(
    "/",
    auth,
    watchlistController.addStock
);

router.delete(
    "/:id",
    auth,
    watchlistController.removeStock
);

module.exports = router;