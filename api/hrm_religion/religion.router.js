const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createReligion, updateReligion, inactiveReligion, getReligion, getReligionByID, getSelecrtReligion } = require('../hrm_religion/religion.controller');

router.post("/", checkToken, createReligion);
router.patch("/", checkToken, updateReligion);
router.delete("/", checkToken, inactiveReligion);
router.get("/", checkToken, getReligion);
router.get("/select", checkToken, getSelecrtReligion);
router.get("/:id", checkToken, getReligionByID);

module.exports = router;