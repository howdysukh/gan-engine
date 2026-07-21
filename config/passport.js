const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },

        async (accessToken, refreshToken, profile, done) => {

            console.log("✅ Google Strategy Executed");
            console.log(profile.displayName);
            console.log(profile.id);

            try {

                let user = await User.findOne({
                    googleId: profile.id
                });

                if (!user) {

                    user = await User.create({
                        provider: "google",
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0]?.value,
                        photo: profile.photos?.[0]?.value
                    });

                }

                return done(null, user);

            } catch (err) {

                done(err, null);

            }

        }
    )
);

module.exports = passport;