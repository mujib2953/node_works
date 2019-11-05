const express = require("express");
const router = express.Router();

/*
* @route_type   : GET
* @route_url    : api/users
* @desc         : Testing route
* @access       : public
*/
router.get("/", (req, res) => {
    res.send("Inside Users root route.");
});

module.exports = router;
