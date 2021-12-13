const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createLeaveType, updateLeaveType, inactiveLeaveType, getLeaveType, getLeaveTypeByID, getSelectLeaveType } = require('../leavetype/leavetype.controller');

router.post("/", checkToken, createLeaveType);
router.patch("/", checkToken, updateLeaveType);
router.delete("/", checkToken, inactiveLeaveType);
router.get("/", checkToken, getLeaveType);
router.get("/select", checkToken, getSelectLeaveType);
router.get("/:id", checkToken, getLeaveTypeByID);

module.exports = router;