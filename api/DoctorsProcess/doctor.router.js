const router = require("express").Router();
const {
    checkToken
} = require("../../auth/token_validation");
const {
    checkDoctorDutyplan,
    insertDutyplan,
    createDoctorDuty,
    getDutyList,
    updateDoctorduty,
    updateDoctorDutyPlan,
    getDutyplan,
    getDoctorById,
    getdoctorDept,
    getDoctorSectionByDept,
    createDoctorPunch,
    getDoctorsByNMC,
    getDoctorPunchmastData,
    getDoctorpunchLog,
    activeDoctorsList,
    clinicalDoctorsList,
    accademicDoctorsList,
    tmcPunchedDoctorList,
    nmcPunchedDoctorList,
    gettodayPresentDoctor,
    getDutyplanByDate,
    createRights,
    getEmployeeDocDepartments,
    updateDeptRights,
    getEmployeeDepartments,
    createDoctorCoff,
    getSelectedDateShift,
    updateDoctorPunchMast,
    getDoctorsPunchData,
    getDoctorPunchMaster,
    getSingleDoctorPunch,
    getSingleDoctorPunchmast,
    getLeaveRequest,
    getDoctorCoff,
    createAccademicRequest,
    getAllCoffRequest,
    msCoffRejectStatus,
    msCoffApproveStatus,
    getAllAccademicRequest,
    msAccademicRejectStatus,
    msAccApproveStatus,
    getAllLeaveRequest,
    getDoctorLeaveDetl,
    msLeaveReqRejectStatus,
    hodAccademicStatus,
    dmsAccademicStatus,
    hodCoffStatus,
    dmsCoffStatus,
    hodLeaveReqApproveStatus,
    dmsLeaveReqApproveStatus,
    hodLeaveReqrejectStatus,
    dmsLeaveReqRejectStatus,
    msLeaveReqApproveStatus,
    updatePunchMasterLeave,
    deleteDoctorLeave,
    deleteDoctorCoff,
    deleteDoctorAccademic,
    getDoctorAccademic,
    CancelpunchMastLeave,
    getDoctorLeaveReport,
    getDoctorCoffReport,
    getDoctorAccademicReport
} = require("./doctorController");


router.post("/check", checkToken, checkDoctorDutyplan)
router.post("/insert", checkToken, insertDutyplan)
router.post("/create/duty", checkToken, createDoctorDuty)
router.get("/select/dutylist", checkToken, getDutyList)
router.patch("/update/duty", checkToken, updateDoctorduty)
router.patch("/update/calendarduty", checkToken, updateDoctorDutyPlan)
router.post("/getData", checkToken, getDutyplan)
router.get("/getdoctor/:id", checkToken, getDoctorById)
router.get("/dept", checkToken, getdoctorDept)
router.get("/sect/:id", checkToken, getDoctorSectionByDept)

router.post("/insert/doctorpunch", checkToken, createDoctorPunch)
router.post("/getDoctor/byNMC", checkToken, getDoctorsByNMC)
router.post("/punchmastdata", checkToken, getDoctorPunchmastData)
router.get("/getLog", checkToken, getDoctorpunchLog)

//reports
router.get("/doctorslist", checkToken, activeDoctorsList)
router.get("/clinicaldoctor", checkToken, clinicalDoctorsList)
router.get("/accademicDoctor", checkToken, accademicDoctorsList)
router.get("/tmcpunchDoctor", checkToken, tmcPunchedDoctorList)
router.get("/nmcpunchDoctor", checkToken, nmcPunchedDoctorList)
router.get("/todayPrsent", checkToken, gettodayPresentDoctor)

router.post("/bydate/dutyplan", checkToken, getDutyplanByDate)

//employee rights to doctor departments
router.post("/insert/rights", checkToken, createRights)
router.get("/employee/rights", checkToken, getEmployeeDocDepartments)
router.patch("/update/rights", checkToken, updateDeptRights)
router.post("/list/departments", checkToken, getEmployeeDepartments)
router.post("/insert/coff", checkToken, createDoctorCoff)
router.post("/selectedDateshift", checkToken, getSelectedDateShift)

router.patch("/nmcPunchupload", checkToken, updateDoctorPunchMast)
router.post("/doctorPunch/dept", checkToken, getDoctorsPunchData)
router.post("/doctorPunchmast", checkToken, getDoctorPunchMaster)
router.post("/single/doctorPunch", checkToken, getSingleDoctorPunch)
router.post("/punchReport/singledoctor", checkToken, getSingleDoctorPunchmast)

router.post("/getdoctors/leaveRequest", checkToken, getLeaveRequest)
router.post("/coffrequest", checkToken, getDoctorCoff)
router.post("/getdoctors/accademicRequest", checkToken, getDoctorAccademic)
router.post("/createAccademic/request", checkToken, createAccademicRequest)
router.post("/doctorleave/update", checkToken, updatePunchMasterLeave)

router.patch("/doctorleave/delete", checkToken, deleteDoctorLeave)
router.patch("/doctorCoff/delete", checkToken, deleteDoctorCoff)
router.patch("/doctorAccademic/delete", checkToken, deleteDoctorAccademic)
router.post("/deleteLeave/punchmast", checkToken, CancelpunchMastLeave)
router.post("/doctorleave/deletepunchmast", checkToken, CancelpunchMastLeave)

//allleavedata
router.get("/allCoffRequest", checkToken, getAllCoffRequest)
router.get("/allAccmdRequest", checkToken, getAllAccademicRequest)
router.get("/allleaveRequest", checkToken, getAllLeaveRequest)
router.get("/getDoctorLeaveDetail/:id", checkToken, getDoctorLeaveDetl)
router.post("/doctorLeaveReport", checkToken, getDoctorLeaveReport)
router.post("/doctorCoffReport", checkToken, getDoctorCoffReport)
router.post("/doctorAccademicReport", checkToken, getDoctorAccademicReport)
//mscoffstatus
router.patch("/mscoff/reject", checkToken, msCoffRejectStatus)
router.patch("/mscoff/approve", checkToken, msCoffApproveStatus)
router.patch("/hodcoff/status", checkToken, hodCoffStatus)
router.patch("/dmscoff/status", checkToken, dmsCoffStatus)

//msaccdemicstatus
router.patch("/msAcc/reject", checkToken, msAccademicRejectStatus)
router.patch("/msAcc/approve", checkToken, msAccApproveStatus)
router.patch("/hodAcc/status", checkToken, hodAccademicStatus)
router.patch("/dmsAcc/status", checkToken, dmsAccademicStatus)

//leaverequeststatus
router.patch("/msLeavereq/reject", checkToken, msLeaveReqRejectStatus)
router.patch("/msLeavereq/approve", checkToken, msLeaveReqApproveStatus)
router.patch("/hodLeavereq/approve", checkToken, hodLeaveReqApproveStatus)
router.patch("/hodLeavereq/reject", checkToken, hodLeaveReqrejectStatus)
router.patch("/dmsLeavereq/approve", checkToken, dmsLeaveReqApproveStatus)
router.patch("/dmsLeavereq/reject", checkToken, dmsLeaveReqRejectStatus)

module.exports = router;