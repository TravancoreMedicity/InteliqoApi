const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { insertmessage, getMesssage } = require("../hrm_message/hrm_message.controller");

router.post("/", checkToken, insertmessage);
router.get("/:id", checkToken, getMesssage);

module.exports = router;
