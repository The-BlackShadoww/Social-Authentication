const authGoogleRouter = require("../router/authGoogleRouter");

module.exports = (app) => {
    app.use("/auth/google", authGoogleRouter);
};
