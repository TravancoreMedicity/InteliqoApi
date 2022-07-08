const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { InsertAdvanceSettings, updateAdvanceSettings, getAdvanceSettings, getAdvanceSettingsById } = require('../advance_settings/advance_settings.controller');

router.post("/", checkToken, InsertAdvanceSettings);
router.patch("/", checkToken, updateAdvanceSettings);
router.get("/", checkToken, getAdvanceSettings);
router.get("/:id", checkToken, getAdvanceSettingsById);

module.exports = router;