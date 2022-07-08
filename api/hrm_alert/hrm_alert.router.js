const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { insertalert, getAlert } = require("../hrm_alert/hrm_alert.controller");

router.post("/", checkToken, insertalert);
router.get("/", checkToken, getAlert);

module.exports = router;
