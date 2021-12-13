const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEarnType, getEarnType } = require('../EarnType/earntype.controller');

router.post("/", checkToken, createEarnType);
router.get("/", checkToken, getEarnType);


module.exports = router;