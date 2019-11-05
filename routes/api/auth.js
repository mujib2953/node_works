const express = require("express");
const router = express.Router();

/*
* @route_type   : GET
* @route_url    : api/auth
* @desc         : Testing route
* @access       : public
*/
router.get("/", (req, res) => {
    res.send("Inside Auth root route.");
});

module.exports = router;
