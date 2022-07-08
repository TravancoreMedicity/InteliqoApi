const jwt = require("jsonwebtoken");
const logger = require('../../logger/logger')
module.exports = {
    validateToken: (req, res) => {
        let token = req.get("authorization");

        if (token) {
            // Remove Bearer from string
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    logger.errorLogger(err)
                    return res.json({
                        success: 100,
                        message: "Invalid Token"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    }
};
