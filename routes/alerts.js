const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const alertController = require("../controllers/alertController");

router.post(
    "/",
    auth,
    alertController.createAlert
);

router.get(
    "/",
    auth,
    alertController.getAlerts
);

router.get(
    "/notifications",
    auth,
    alertController.getNotifications
);

router.patch(
    "/:id/seen",
    auth,
    alertController.markNotificationSeen
);

router.delete(
    "/:id",
    auth,
    alertController.deleteAlert
);

module.exports = router;