const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { createAttendanceMarking, checkAttendanceMarking } = require('../attendance_marking_save/attendance_marking_save.controller');

router.post("/", checkToken, createAttendanceMarking);
router.post("/check", checkToken, checkAttendanceMarking);


module.exports = router;