const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createEarning, updateEarning, inactiveEarning, getEarningData, getEarningDataByID, getSelectDrop } = require('../earnings/earn.controller');

router.post("/", checkToken, createEarning);
router.patch("/", checkToken, updateEarning);
router.delete("/", checkToken, inactiveEarning);
router.get("/", checkToken, getEarningData);
router.get("/select/:id", checkToken, getSelectDrop);
router.get("/:id", checkToken, getEarningDataByID);

module.exports = router;