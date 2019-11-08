const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");

/*
* @route_type   : GET
* @route_url    : api/profile/me
* @desc         : Gets current users profile & details
* @access       : private
*/
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        // --- if no profile match with current user id
        if (!profile) {
            return res.status(404).json({ message: "There is no profile for this user." });
        }

        // --- we founf the profile
        res.json(profile);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
