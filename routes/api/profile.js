const express = require("express");
const { check, validationResult } = require("express-validator");
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

/*
* @route_type   : POST
* @route_url    : api/profile
* @desc         : This will update the users profiles
* @access       : private
*/
router.post("/", [
    auth,
    [
        check("status", "status is required").not().isEmpty(),
        check("skills", "Skills are required.").not().isEmpty(),
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        linkedin,
        instagram,
    } = req.body;

    // --- building profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio= bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
        profileFields.skills = skills.split(",").map(s => s.trim());
    }

    // --- building social object
    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter= twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {

        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            ).populate("user", [ "name", "avatar" ]);

            return res.json(profile);
        }

        // --- since no profile is found so will create new one
        profile = new Profile(profileFields);

        await profile.save();
        return res.json(profile);

    } catch(e) {
        console.log(e.message);
        return res.status(500).send("Server Error.");
    }
});


/*
* @route_type   : GET
* @route_url    : api/profile
* @desc         : This will return all profiles in a system
* @access       : public
*/
router.get("/", async (req, res) => {
    try {
        let profile = await Profile.find().populate("user", ["name", "avatar"]);
        res.json(profile);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error.");
    }
});

/*
* @route_type   : GET
* @route_url    : api/profile/user/:user_id
* @desc         : This will return profiles of given user
* @access       : public
*/
router.get("/user/:user_id", async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user." });
        }

        res.json(profile);
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error.");
    }
});

module.exports = router;
