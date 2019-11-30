const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

/*
* @route_type   : GET
* @route_url    : api/posts
* @desc         : Testing route
* @access       : public
*/
router.get("/", (req, res) => {
    res.send("Inside Posts root route.");
});

/*
* @route_type   : POST
* @route_url    : api/posts
* @desc         : Creates new post
* @access       : private
*/
router.post("/", [
    auth,
    [
        check("text", "Text is required.").not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");
        const { text } = req.body;
        const {
            name,
            avatar,
        } = user;

        const newPost = new Post({
            text,
            name,
            avatar,
            user: req.user.id, 
        });

        const post = await newPost.save();

        res.json(post);
    } catch(error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
