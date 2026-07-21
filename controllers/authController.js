const User = require("../models/User");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

exports.guestLogin = async (req,res)=>{
      console.log("🔥 guestLogin called");
    try{

        const guestId = uuid();

        const user = await User.create({

            provider:"guest",

            guestId

        });

        const token = jwt.sign(
         {
             id: user._id
         },
            process.env.JWT_SECRET,
         {
             expiresIn: "30d"
         }
);

        res.cookie("token", token, {
            httpOnly: true,
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({

            success:true,

            user

        });

    }

    catch(err){

        res.status(500).json({

            success:false,

            message:err.message

        });

    }

};

exports.googleLogin = async (req, res) => {

    console.log("🔥 googleLogin called");
    console.log(req.user);

    const token = jwt.sign(
        {
            id: req.user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d"
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.redirect("/");
};

exports.logout = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax"
    });

    res.json({
        success: true,
        message: "Logged out successfully."
    });

};