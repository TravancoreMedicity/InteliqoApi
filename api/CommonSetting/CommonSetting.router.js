const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { getCommonSettings, InsertCommonSettings, updateCommonSettings } = require('../CommonSetting/CommonSetting.controller');

router.post("/", checkToken, InsertCommonSettings);
router.get("/", checkToken, getCommonSettings);
router.patch("/", checkToken, updateCommonSettings);

module.exports = router;