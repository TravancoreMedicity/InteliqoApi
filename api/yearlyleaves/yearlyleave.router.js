const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createYearlyLeave, updateYearlyLeave, inactiveYearlyLeave, getYearlyLeave, getYearlyLeaveByID } = require('../yearlyleaves/yearlyleave.controller');

router.post("/", checkToken, createYearlyLeave);
router.patch("/", checkToken, updateYearlyLeave);
router.delete("/", checkToken, inactiveYearlyLeave);
router.get("/", checkToken, getYearlyLeave);
router.get("/:id", checkToken, getYearlyLeaveByID);

module.exports = router;