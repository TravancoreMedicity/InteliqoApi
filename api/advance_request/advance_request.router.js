const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { InsertAdvanceRequest } = require('../advance_request/advance_request.controller');

router.post("/", checkToken, InsertAdvanceRequest);

module.exports = router;