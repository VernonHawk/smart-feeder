const { verifyJWToken, createJWToken } = require("./tokens");

function decodeRequestToken(req, res) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    return verifyJWToken(token)
            .catch((err) => {
                res.status(403)
                    .json({success: false, message: "Invalid auth token provided."});

                return Promise.reject("Invalid auth token provided.");
            });
}

module.exports = exports = {
    decodeRequestToken
};