const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { uploadManualreqst, getManualReqstBtwDate } = require('./Manual.controller')

router.post("/uploadManualRequest", uploadManualreqst);
router.post("/getdata", checkToken, getManualReqstBtwDate)

module.exports = router;