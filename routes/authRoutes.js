const express = require("express");
const passport = require("passport");

const router = express.Router();

const authController = require("../controllers/authController");
const sessionController = require("../controllers/sessionController");

router.get("/guest", authController.guestLogin);
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
router.get(

    "/google/callback",

    passport.authenticate("google", {
        session: false,
        failureRedirect: "/"
    }),

    authController.googleLogin

);

router.get("/logout", authController.logout);

router.get("/session", sessionController.session);

module.exports = router;