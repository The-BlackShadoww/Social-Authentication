const router = require("express").Router();
//* Passport is working here.
const passport = require("passport");
require("../config/authGoogle");

//* According to the rules of passport.js every request will be get request no post request.

//! Step-1
//localhost:3001/auth/google
router
    .route("/")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

//! Step-3 till authenticate,
//localhost:3001/auth/google/redirect
router
    .route("/redirect")
    .get(passport.authenticate("google", { session: false }), (req, res) => {
        //! Step-5 --> from here we will send a jwt token to the user.
        res.send(req.user);
    });

module.exports = router;
