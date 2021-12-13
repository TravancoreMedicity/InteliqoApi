const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createRegtype, updateRegtype, inactiveRegtype, getRegTypeData, getRegTypeDataByID, getRegTypeSelect } = require('../registrationtype/regtype.controller');

router.post("/", checkToken, createRegtype);
router.patch("/", checkToken, updateRegtype);
router.delete("/", checkToken, inactiveRegtype);
router.get("/", checkToken, getRegTypeData);
router.get("/select", checkToken, getRegTypeSelect);
router.get("/:id", checkToken, getRegTypeDataByID);

module.exports = router;