const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

// --- Users model
const User = require("../../models/User");

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
router.post("/register", [
    check("name", "Name is required.").not().isEmpty(),

    check("email", "Please include a valid email.").isEmail(),

    check("password", "Please enter password with 6 or more charcters").isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // --- check user is already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ message: "User already exists." }] });
        }

        // --- get users gravatar
        const avatar = gravatar.url(email, {
            s: "200",   // --- size
            r: "pg",    // --- rating
            d: "mm",    // --- default
        });

        user = new User({
            name,
            email,
            password,
            avatar,
        });

        // --- encrypt users password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        // --- save the user to DB
        await user.save();

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
