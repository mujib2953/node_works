const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const router = express.Router();

const auth = require("../../middleware/auth");
const User = require("../../models/User");

/*
* @route_type   : GET
* @route_url    : api/auth
* @desc         : Testing route
* @access       : private
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

/*
* @route_type   : POST
* @route_url    : api/auth/login
* @desc         : with this user can logged in into the system
* @access       : public
*/
router.post("/login", [
    check("email", "Please include a valid email.").isEmail(),

    check("password", "Password is required.").exists()
],
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // --- check user is exists or not
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ message: "Invalid credentials." }] });
        }
        
        // --- checks password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ errors: [{ message: "Invalid credentials." }] });
        }

        // --- return jwt
        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                expiresIn: 3600,
            }, (err, token) => {
                if (err) throw err;

                res.json({ token });
            }
        );
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
