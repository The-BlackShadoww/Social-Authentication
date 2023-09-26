const router = require("express").Router();
const upload = require("../middlewares/multer");
const multer = require("multer");

router.route("/").post(async (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
        } else if (err) {
        }
        console.log(req.file);
        console.log(req.body);
        // res.sendFile(req.file);
    });
});

module.exports = router;
