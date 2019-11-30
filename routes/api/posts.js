const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

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

/*
* @route_type   : GET
* @route_url    : api/posts
* @desc         : Get All Posts in an application
* @access       : private
*/
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error.");
    }
});

/*
* @route_type   : GET
* @route_url    : api/posts/:post_id
* @desc         : Get Post by id
* @access       : private
*/
router.get("/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(400).json({ msg: "Post Not Found." });
        }

        res.json(post);
    } catch(error) {
        console.error(error.message);

        if (!error.kind === "ObjectId") {
            return res.status(400).json({ msg: "Post Not Found." });
        }

        res.status(500).send("Server Error.");
    }
});

/*
* @route_type   : DELETE
* @route_url    : api/posts/:post_id
* @desc         : Delete Post by id
* @access       : private
*/
router.delete("/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(400).json({ msg: "Post Not Found." });
        }

        // --- checking user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized." });
        }

        await post.remove();

        res.json({ msg: "Post removed." });
    } catch(error) {
        console.error(error.message);

        if (!error.kind === "ObjectId") {
            return res.status(400).json({ msg: "Post Not Found." });
        }

        res.status(500).send("Server Error.");
    }
});

/*
* @route_type   : PUT
* @route_url    : api/posts/like/:post_id
* @desc         : Like any post
* @access       : private
*/
router.put("/like/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(400).json({ msg: "Post not found." });
        }

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Post already liked." });
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();

        res.json(post.likes);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

/*
* @route_type   : PUT
* @route_url    : api/posts/unlike/:post_id
* @desc         : Like any post
* @access       : private
*/
router.put("/unlike/:post_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post) {
            return res.status(400).json({ msg: "Post not found." });
        }

        if (post.likes.filter(like => like.user.toString() === req.user.id ).length === 0) {
            return res.status(400).json({ msg: "Post has not yet been liked." });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);

    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error.");
    }
});
module.exports = router;
