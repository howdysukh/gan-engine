const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.session = async (req, res) => {

    try {

        const token = req.cookies.token;

        if (!token) {

            return res.json({
                loggedIn: false
            });

        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.id);

        if (!user) {

            return res.json({
                loggedIn: false
            });

        }

        res.json({

            loggedIn: true,

            user

        });

    } catch {

        res.json({
            loggedIn: false
        });

    }

};