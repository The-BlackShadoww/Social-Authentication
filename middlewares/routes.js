const authGoogleRouter = require("../router/authGoogleRouter");
const postRouter = require("../router/postRouter");

module.exports = (app) => {
    app.use("/auth/google", authGoogleRouter);
    app.use("/api/post", postRouter);
};
