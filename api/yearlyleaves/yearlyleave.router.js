const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createYearlyLeave, updateYearlyLeave,
    inactiveYearlyLeave, getYearlyLeave, getYearlyLeaveByID, getcommonleave } = require('../yearlyleaves/yearlyleave.controller');

router.post("/", checkToken, createYearlyLeave);
router.patch("/", checkToken, updateYearlyLeave);
router.delete("/", checkToken, inactiveYearlyLeave);
router.get("/", checkToken, getYearlyLeave);
router.get("/:id", checkToken, getYearlyLeaveByID);
router.get("/get/getcommonleave", checkToken, getcommonleave);

module.exports = router;