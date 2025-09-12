const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
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
    createDoctorPunch } = require("./doctorController");


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

module.exports = router;