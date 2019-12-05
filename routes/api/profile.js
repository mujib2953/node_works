const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

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
            return res.status(400).json({ msg: "Profile not found." });
        }

        res.json(profile);
    } catch(e) {
        console.error(e.message);
        if (e.kind === "ObjectId") {
            return res.status(400).json({ msg: "Profile not found." });
        }
        res.status(500).send("Server Error.");
    }
});

/*
* @route_type   : DELETE
* @route_url    : api/profile
* @desc         : This will delete profiles of given user
* @access       : private
*/
router.delete("/", auth, async (req, res) => {
    try {
        // remove user's post
        await User.deleteMany({ user: req.user.id });

        // --- removing user's profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // --- Removing user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: "User deleted successfully." });
    } catch(e) {
        console.error(e.message);
        res.status(500).send("Server Error.");
    }
});

/*
* @route_type   : PUT
* @route_url    : api/profile/experience
* @desc         : This will add experience to the profiles of given user
* @access       : private
*/
router.put("/experience", [
    auth,
    [
        check("title", "Title is required.").not().isEmpty(),
        check("company", "Company name is required.").not().isEmpty(),
        check("from", "From date is required.").not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

/*
* @route_type   : DELETE
* @route_url    : api/profile/experience/:experience_id
* @desc         : This will delete experience of given user
* @access       : private
*/
router.delete("/experience/:experience_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.experience_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    } 
});

/*
* @route_type   : PUT
* @route_url    : api/profile/eduction
* @desc         : This will add education to the profiles of given user
* @access       : private
*/
router.put("/education", [
    auth,
    [
        check("school", "School is required.").not().isEmpty(),
        check("degree", "Degree is required.").not().isEmpty(),
        check("fieldofstudy", "Field of study is required.").not().isEmpty(),
    ]
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

/*
* @route_type   : DELETE
* @route_url    : api/profile/eduction/:education_id
* @desc         : This will delete education from profiles of given user
* @access       : private
*/
router.delete("/education/:education_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.education_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
