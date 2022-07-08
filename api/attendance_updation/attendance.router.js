const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { validateAttendance, processAttendData, getpunchmastcalcu,
    getdataupdatecal, GetEmployeeShiftDetails, getPunchDetailsEmp,
    updatePunchInandPunchOut, updatePunchState, updateholidaycredit, updateholidaytaken } = require("../attendance_updation/attendance.controller")

router.post("/", checkToken, validateAttendance);
router.post("/getdataupdatecal", checkToken, getdataupdatecal)
router.post("/proc", checkToken, processAttendData);
router.post("/attendancecal", checkToken, getpunchmastcalcu)
router.post("/attendanceshiftdetl", checkToken, GetEmployeeShiftDetails)
router.post("/punchdetlemp", checkToken, getPunchDetailsEmp)
router.patch("/", checkToken, updatePunchInandPunchOut)
router.patch("/updateState", checkToken, updatePunchState)
router.patch("/holidaycredit", checkToken, updateholidaycredit)
router.patch("/holidaytaken", checkToken, updateholidaytaken)

module.exports = router;