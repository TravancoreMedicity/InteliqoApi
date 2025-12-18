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
    getSelectedDateShift
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

module.exports = router;