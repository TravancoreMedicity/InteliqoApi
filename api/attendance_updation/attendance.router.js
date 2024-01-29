const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { validateAttendance, processAttendData, getpunchmastcalcu,
    getdataupdatecal, GetEmployeeShiftDetails, getPunchDetailsEmp,
    updatePunchInandPunchOut, updatePunchState, updateholidaycredit,
    updateholidaytaken, getPunchDataEmCodeWise, getPunchMasterData, getShiftfromPunchMaster,
    updatePunchMasterData, updatePunchMastDuty, getHolidayDate, getDutyPlan,
    getPunchMastDataCheckWoff, updatePunchMasWoff, checkAttendanceProcess, checkInOutMarked,
    checkAttendanceProcessDept, getEmpList, getEmployeeRights
} = require("../attendance_updation/attendance.controller")

router.post("/", checkToken, validateAttendance);
router.post("/getPunchData", checkToken, getPunchDataEmCodeWise);
router.post("/getPunchMasterData", checkToken, getPunchMasterData);
router.post("/updatePunchMasterData", checkToken, updatePunchMasterData);
router.post("/getShiftData", checkToken, getShiftfromPunchMaster);
router.post("/getdataupdatecal", checkToken, getdataupdatecal)
router.post("/proc", checkToken, processAttendData);
router.post("/attendancecal", checkToken, getpunchmastcalcu)
router.post("/attendanceshiftdetl", checkToken, GetEmployeeShiftDetails)
router.post("/punchdetlemp", checkToken, getPunchDetailsEmp)
router.post("/inOutUpdate", checkToken, updatePunchInandPunchOut)
router.patch("/updateState", checkToken, updatePunchState)
router.patch("/holidaycredit", checkToken, updateholidaycredit)
router.patch("/holidaytaken", checkToken, updateholidaytaken)

router.post("/updatePunchMastDuty", checkToken, updatePunchMastDuty);
router.post("/getHolidayDate", checkToken, getHolidayDate);
router.post("/getDutyPlan", checkToken, getDutyPlan);
router.post("/getPunchMastDataCheckWoff", checkToken, getPunchMastDataCheckWoff);
router.post("/updatePunchMasWoff", checkToken, updatePunchMasWoff);

router.post("/checkAttendanceProcess", checkToken, checkAttendanceProcess)
router.post("/checkInOutMarked", checkToken, checkInOutMarked)

router.post("/checkallEmp", checkToken, checkAttendanceProcessDept)
router.post("/emplist/show", checkToken, getEmpList)
router.post("/rights", checkToken, getEmployeeRights)

module.exports = router;