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

/*
* @route_type   : POST
* @route_url    : api/users/register
* @desc         : with this new User can register themself with application
* @access       : public
*/
router.post("/register", (req, res) => {
    console.log(req.body);
    res.send("Registered new User successfully.");
});

module.exports = router;
