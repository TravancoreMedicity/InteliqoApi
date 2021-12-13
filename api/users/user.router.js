const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { validateToken } = require("../users/user.controllers");

router.get('/', validateToken, (req, res) => {
    return res.json(req.complete);
});

module.exports = router;

