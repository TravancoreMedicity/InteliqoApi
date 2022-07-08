const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createearndeduction, updateearndeduction, getEarnDeductByID,
    inactiveEarnDeduct, getEarnDeductBySlno, GetFixedAndEarningWage } = require('../employeEarnDeduction/earnDeduction.controller');

router.post("/", checkToken, createearndeduction);
router.patch("/", checkToken, updateearndeduction);
router.delete("/", checkToken, inactiveEarnDeduct);
router.get("/select/:id", checkToken, getEarnDeductBySlno);
router.get("/:id", checkToken, getEarnDeductByID);
router.post("/getwage", checkToken, GetFixedAndEarningWage);

module.exports = router;