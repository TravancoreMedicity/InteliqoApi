const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createShift, updateShift, inactiveShift, getSelectDrop, getShiftData, getShiftDataById } = require('../shiftmaster/shift.controller');

router.post("/", checkToken, createShift);
router.patch("/", checkToken, updateShift);
router.delete("/", checkToken, inactiveShift);
router.get("/", checkToken, getShiftData);
router.get("/:id", checkToken, getShiftDataById);
router.get("/select", checkToken, getSelectDrop);

module.exports = router;