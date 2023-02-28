const express = require('express');
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));

router.use("/test-server", (req, res, next) => {
    res.status(200).json({
        message: "Server is Alive :)"
    })
})

module.exports = router