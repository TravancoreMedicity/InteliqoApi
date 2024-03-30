const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { validateAttendance, processAttendData, getpunchmastcalcu,
    getdataupdatecal, GetEmployeeShiftDetails, getPunchDetailsEmp,
    updatePunchInandPunchOut, updatePunchState, updateholidaycredit,
    updateholidaytaken, getPunchDataEmCodeWise, getPunchMasterData, getShiftfromPunchMaster,
    updatePunchMasterData, updatePunchMastDuty, getHolidayDate, getDutyPlan,
    getPunchMastDataCheckWoff, updatePunchMasWoff, checkAttendanceProcess, checkInOutMarked,
    checkAttendanceProcessDept, getEmpList, getEmployeeRights, sectionwiseEmppunchMast,
    sectionwiseEmpDutyplan, checkAttendanceProcessSectionWise, getHolidayListDateWise,
    getPunchDataEmCodeWiseDateWise, getDutyPlanBySection, getPunchMasterDataSectionWise,
    updatePunchMaster, updatePunchMarkingHR, updateDutyPlanTable, updateDelStatDutyPlanTable, checkPunchMarkingHR,
    updatePunchMasterSingleRow
} = require("../attendance_updation/attendance.controller")

router.post("/", checkToken, validateAttendance);
router.post("/getPunchData", checkToken, getPunchDataEmCodeWise);
router.post("/getPunchDataEmCodeWiseDateWise", checkToken, getPunchDataEmCodeWiseDateWise);
router.post("/getPunchMasterData", checkToken, getPunchMasterData);
router.post("/getPunchMasterDataSectionWise", checkToken, getPunchMasterDataSectionWise);
router.post("/updatePunchMasterData", checkToken, updatePunchMasterData);
router.post("/updatePunchMaster", checkToken, updatePunchMaster); // new update punchmaster data api
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
router.post("/getHolidayListDateWise", checkToken, getHolidayListDateWise);
router.post("/getDutyPlan", checkToken, getDutyPlan);
router.post("/getDutyPlanBySection", checkToken, getDutyPlanBySection);
router.post("/getPunchMastDataCheckWoff", checkToken, getPunchMastDataCheckWoff);
router.post("/updatePunchMasWoff", checkToken, updatePunchMasWoff);

router.post("/checkAttendanceProcess", checkToken, checkAttendanceProcess)
router.post("/checkInOutMarked", checkToken, checkInOutMarked)

router.post("/checkallEmp", checkToken, checkAttendanceProcessDept)
router.post("/emplist/show", checkToken, getEmpList)
router.post("/rights", checkToken, getEmployeeRights)

router.post("/sectionwiseEmppunchMast", checkToken, sectionwiseEmppunchMast)
router.post("/sectionwiseEmpDutyplan", checkToken, sectionwiseEmpDutyplan)
router.post("/checkAttendanceProcessSectionWise", checkToken, checkAttendanceProcessSectionWise)
router.post("/updatePunchMarkingHR", checkToken, updatePunchMarkingHR)
router.post("/updateDutyPlanTable", checkToken, updateDutyPlanTable)
router.post("/updateDelStatDutyPlanTable", checkToken, updateDelStatDutyPlanTable)
router.post("/checkPunchMarkingHR", checkToken, checkPunchMarkingHR)
router.post("/updatePunchMasterSingleRow", checkToken, updatePunchMasterSingleRow)

module.exports = router;