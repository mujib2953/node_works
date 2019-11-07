const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {

    // --- reading token from header of request
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ messages: "No token, authorization denied." });
    }

    // --- checking token is valid
    try {

        const decodedToken = jwt.verify(token, config.get("jwtSecret"));

        req.user = decodedToken.user;
        next();
    } catch(e) {
       res.status(401).json({ messages: "Token is invalid." });
    }

}

