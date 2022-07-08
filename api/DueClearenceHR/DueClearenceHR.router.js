const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createDueHrApproval } = require('../DueClearenceHR/DueClearenceHR.controller');

router.post("/", checkToken, createDueHrApproval);

module.exports = router;