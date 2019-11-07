const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

/*
* @route_type   : GET
* @route_url    : api/auth
* @desc         : Testing route
* @access       : public
*/
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
