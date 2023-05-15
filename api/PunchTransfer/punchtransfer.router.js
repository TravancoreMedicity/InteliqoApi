const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getpunchdata } = require("../PunchTransfer/punchtransfer.controller")

router.post("/punchdata", checkToken, getpunchdata)


module.exports = router;