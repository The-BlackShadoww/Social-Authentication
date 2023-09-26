const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user.js");
const _ = require("lodash");

const strategy = new GoogleStrategy(
    //! Step-2
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3001/auth/google/redirect",
        // passReqToCallback: true,
    },
    //! Step-4
    async (accessToken, refreshToken, profile, cb) => {
        // console.log("profile: ", profile);
        //! Here we are storing the user to the mongoDB database. First check if the user already exists in database. If user exits then let him login or if user does not exits then create a new user and save to mongoDB database.
        let user = await User.findOne({
            googleId: profile.id,
            email: profile._json.email,
        });

        if (user) {
            const token = user.generateJWT();
            const response = {
                user: _.pick(user, ["email", "_id"]),
                token: token,
            };
            cb(null, response);
            // console.log("User exists :", user);
        } else {
            user = new User({
                googleId: profile.id,
                email: profile._json.email,
            });
            await user.save();
            const token = user.generateJWT();
            const response = {
                user: _.pick(user, ["email", "_id"]),
                token: token,
            };
            cb(null, response);

            // console.log("This is new user => ", user);
        }
    }
);

// this is main thing
passport.use(strategy);
